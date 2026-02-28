import mongoose from 'mongoose';

export interface IMessage extends mongoose.Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const MessageSchema = new mongoose.Schema<IMessage>({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email.'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message.'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
