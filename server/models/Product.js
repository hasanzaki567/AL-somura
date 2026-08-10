import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  image: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  stock: { type: Number, required: true, default: 0 },
  material: { type: String },
  colors: [colorSchema], // maps to 'shades/colors'
  dimensions: { type: String },
  sku: { type: String },
  status: { type: String, enum: ['active', 'inactive', 'archived'], default: 'active' },
  details: [{ type: String }], // additional features list
  boutiques: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  customizable: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
