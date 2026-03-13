import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  aboutVideoLink: {
    type: String,
    default: ''
  },
  aboutVideoPlaceholder: {
    type: String,
    default: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
  }
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
