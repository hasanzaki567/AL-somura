import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// @route GET /api/products
// @desc Fetch all products (with optional filtering)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { status: { $ne: 'archived' } };

    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route GET /api/products/:id
// @desc Fetch single product
router.get('/:id', async (req, res) => {
  try {
    let product;
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);
    if (isValidObjectId) {
      product = await Product.findById(req.params.id);
    }
    if (!product) {
      product = await Product.findOne({ slug: req.params.id });
    }

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --- ADMIN ROUTES ---

// @route POST /api/products/upload
// @desc Upload base64 image
router.post('/upload', protect, admin, (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ message: 'No image provided' });

    const matches = image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ message: 'Invalid base64 format' });
    }

    let extension = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    const data = Buffer.from(matches[2], 'base64');
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${extension}`;
    const filepath = path.join(__dirname, '../uploads', filename);

    fs.writeFileSync(filepath, data);
    res.json({ url: `http://localhost:5000/uploads/${filename}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route POST /api/products
// @desc Create a product
router.post('/', protect, admin, async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route PUT /api/products/:id
// @desc Update a product
router.put('/:id', protect, admin, async (req, res) => {
  try {
    let product;
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);
    if (isValidObjectId) {
      product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    }
    if (!product) {
      product = await Product.findOneAndUpdate({ slug: req.params.id }, req.body, { new: true });
    }

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route DELETE /api/products/:id
// @desc Soft delete (archive) a product
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    let product;
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);
    if (isValidObjectId) {
      product = await Product.findById(req.params.id);
    }
    if (!product) {
      product = await Product.findOne({ slug: req.params.id });
    }

    if (product) {
      product.status = 'archived';
      await product.save();
      res.json({ message: 'Product archived successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
