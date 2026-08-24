import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/alsumora';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Database Connection
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected successfully');
    
    // Auto-seeding logic for 54 products catalog
    try {
      const Product = (await import('./models/Product.js')).default;
      const count = await Product.countDocuments({ status: { $ne: 'archived' } });
      if (count < 50) {
        console.log(`Database has only ${count} products. Auto-seeding the 54 premium products...`);
        const jsonPath = path.resolve(__dirname, '../src/data/products_data.json');
        if (fs.existsSync(jsonPath)) {
          const rawData = fs.readFileSync(jsonPath, 'utf8');
          const products = JSON.parse(rawData);
          
          // Clear active and inactive products (keep archived if any)
          await Product.deleteMany({ status: { $ne: 'archived' } });
          
          // Seed the database
          const formattedProducts = products.map(p => ({
            ...p,
            slug: p.id,
            stock: p.stock || 15,
            isBestSeller: p.isBestSeller !== undefined ? p.isBestSeller : (p.isFeatured || false),
            isLowStock: p.isLowStock !== undefined ? p.isLowStock : false,
            status: 'active'
          }));
          await Product.insertMany(formattedProducts);
          console.log(`Successfully seeded ${formattedProducts.length} products into the database.`);
        } else {
          console.error(`Seed file not found at: ${jsonPath}`);
        }
      }
      
      // Manually force-update badges on key products to ensure they appear in the database
      try {
        const Product = (await import('./models/Product.js')).default;
        await Product.updateOne({ slug: 'sovereign-cafe-racer' }, { isBestSeller: true, isLowStock: true });
        await Product.updateOne({ slug: 'atelier-suede-bomber' }, { isBestSeller: true, isLowStock: false });
        await Product.updateOne({ slug: 'handwelted-oxford-shoes' }, { isBestSeller: true, isLowStock: true });
        console.log('Successfully updated showcase badges for key seed products in MongoDB.');
      } catch (err) {
        console.error('Error updating key badges on startup:', err);
      }
    } catch (err) {
      console.error('Error during auto-seeding:', err);
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Serve frontend static assets in production
if (process.env.NODE_ENV === 'production') {
  const distDir = path.join(__dirname, '../dist');
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
