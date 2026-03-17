import mongoose from 'mongoose';

export interface IAdmin extends mongoose.Document {
  username: string;
  password: string;
}

const AdminSchema = new mongoose.Schema<IAdmin>({
  username: {
    type: String,
    required: true,
    default: 'fahadmalik',
  },
  password: {
    type: String,
    required: true,
    default: 'fahadmalik123',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
