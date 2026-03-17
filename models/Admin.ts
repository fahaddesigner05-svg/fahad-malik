import mongoose from 'mongoose';

export interface IAdmin extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  resetCode?: string;
  resetCodeExpires?: Date;
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
  email: {
    type: String,
    required: true,
    default: 'fahaddesigner05@gmail.com',
  },
  resetCode: {
    type: String,
  },
  resetCodeExpires: {
    type: Date,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
