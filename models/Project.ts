import mongoose from 'mongoose';

export interface IProject extends mongoose.Document {
  title: string;
  description: string;
  category: string;
  img: string;
  demoLink: string;
  color: string;
}

const ProjectSchema = new mongoose.Schema<IProject>({
  title: {
    type: String,
    required: [true, 'Please provide a title for this project.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this project.'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category for this project.'],
  },
  img: {
    type: String,
    required: [true, 'Please provide an image URL for this project.'],
  },
  demoLink: {
    type: String,
  },
  color: {
    type: String,
    default: 'cyan',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
