import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';
import { uploadImageToImageKit, getAuthenticationParameters } from '../utils/imagekit.js';
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
    const { category, search, includeArchived } = req.query;
    let query = {};

    if (includeArchived !== 'true') {
      query.status = { $ne: 'archived' };
    }

    if (category && category !== 'All') {
      query.category = { $regex: `^${category.trim()}$`, $options: 'i' };
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    console.log(`[Products API] Mongo DB Status: Connected. Found ${products.length} products in collection.`);
    res.json(products);
  } catch (error) {
    console.error('[Products API] Mongo DB Error:', error.message);
    res.status(500).json({ message: 'Server error fetching products from database', error: error.message });
  }
});

// @route GET /api/products/imagekit-auth
// @desc Get authentication parameters for direct ImageKit upload
router.get('/imagekit-auth', (req, res) => {
  try {
    const params = getAuthenticationParameters();
    res.json(params);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate ImageKit auth params', error: error.message });
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
// @desc Upload image via ImageKit CDN (with local fallback)
router.post('/upload', protect, admin, async (req, res) => {
  try {
    const { image, fileName } = req.body;
    if (!image) return res.status(400).json({ message: 'No image provided' });

    const result = await uploadImageToImageKit(image, fileName || `product_${Date.now()}`, '/products');
    res.json(result);
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
    console.log('PUT payload received:', req.body);
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
