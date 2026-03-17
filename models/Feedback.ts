import mongoose from 'mongoose';

export interface IFeedback extends mongoose.Document {
  projectId: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  createdAt: Date;
}

const FeedbackSchema = new mongoose.Schema<IFeedback>({
  projectId: {
    type: String,
    required: [true, 'Project ID is required'],
  },
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
  rating: {
    type: Number,
    required: [true, 'Please provide a rating.'],
    min: 1,
    max: 5,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
