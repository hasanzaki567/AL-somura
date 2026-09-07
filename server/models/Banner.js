import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tag: { type: String, required: true },
  order: { type: Number, required: true, default: 0 }
}, { timestamps: true });

export default mongoose.model('Banner', bannerSchema);
