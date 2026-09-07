import express from 'express';
import Banner from '../models/Banner.js';
import { protect, admin } from '../middleware/auth.js';
import { uploadImageToImageKit } from '../utils/imagekit.js';

const router = express.Router();

// @route GET /api/banners
// @desc Fetch all banners (public, sorted by order)
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find({}).sort({ order: 1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching banners', error: error.message });
  }
});

// @route GET /api/banners/:id
// @desc Fetch single banner
router.get('/:id', async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --- ADMIN ROUTES ---

// @route POST /api/banners/upload
// @desc Upload banner image via ImageKit CDN
router.post('/upload', protect, admin, async (req, res) => {
  try {
    const { image, fileName } = req.body;
    if (!image) return res.status(400).json({ message: 'No image provided' });

    const result = await uploadImageToImageKit(image, fileName || `banner_${Date.now()}`, '/banners');
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route POST /api/banners
// @desc Create a new banner (auto-assigns order at end)
router.post('/', protect, admin, async (req, res) => {
  try {
    const maxOrder = await Banner.findOne({}).sort({ order: -1 }).select('order');
    const newOrder = maxOrder ? maxOrder.order + 1 : 1;

    const banner = new Banner({ ...req.body, order: newOrder });
    const createdBanner = await banner.save();
    res.status(201).json(createdBanner);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route PUT /api/banners/reorder
// @desc Bulk update banner order from an array of { _id, order }
router.put('/reorder', protect, admin, async (req, res) => {
  try {
    const { orderUpdates } = req.body;
    if (!Array.isArray(orderUpdates)) {
      return res.status(400).json({ message: 'orderUpdates must be an array' });
    }

    const bulkOps = orderUpdates.map(({ _id, order }) => ({
      updateOne: {
        filter: { _id },
        update: { order }
      }
    }));

    await Banner.bulkWrite(bulkOps);
    const banners = await Banner.find({}).sort({ order: 1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Server error reordering banners', error: error.message });
  }
});

// @route PUT /api/banners/:id
// @desc Update a banner
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route DELETE /api/banners/:id
// @desc Delete a banner permanently
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
