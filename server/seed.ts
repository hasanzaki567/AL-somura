import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Product from './models/Product.js';
import { PRODUCTS } from '../src/data/products.js';

// We need to change the extension to .ts when running it via tsx, but PRODUCTS is imported from a .ts file.
// Since we are running with tsx, we can import from '../src/data/products' directly (tsx resolves it).

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/alsumora';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data (Be careful in production! We only do this initially)
    await User.deleteMany();
    await Product.deleteMany();
    console.log('Cleared existing data');

    // Create Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    await User.create({
      name: 'Admin User',
      email: 'admin@alsumora.com',
      password: hashedPassword,
      role: 'admin',
      phone: '+442079460912'
    });
    console.log('Admin user created (admin@alsumora.com / admin123)');

    // Insert Products
    const mappedProducts = PRODUCTS.map(p => ({
      name: p.name,
      slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: p.description,
      price: p.price,
      category: p.category,
      images: p.images,
      stock: 50, // Default stock
      colors: p.colors,
      details: p.details,
      boutiques: p.boutiques,
      isFeatured: p.isFeatured || false,
      isBestSeller: p.isBestSeller !== undefined ? p.isBestSeller : (p.isFeatured || false),
      isLowStock: p.isLowStock !== undefined ? p.isLowStock : false,
      customizable: p.customizable || false,
      status: 'active'
    }));

    await Product.insertMany(mappedProducts);
    console.log(`Inserted ${mappedProducts.length} products`);

    console.log('Database Seeding Complete!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
