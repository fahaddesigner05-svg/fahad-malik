import mongoose from 'mongoose';

export interface IProject extends mongoose.Document {
  title: string;
  description: string;
  category: string;
  img: string;
  images?: string[];
  coverImg?: string;
  videoLink: string;
  color: string;
  role?: string;
  timeline?: string;
  goals?: string[];
  techStack?: { name: string; iconType: string }[];
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
    required: false,
  },
  images: {
    type: [String],
    default: [],
  },
  coverImg: {
    type: String,
  },
  videoLink: {
    type: String,
  },
  color: {
    type: String,
    default: 'cyan',
  },
  role: {
    type: String,
    default: 'Lead Designer',
  },
  timeline: {
    type: String,
    default: 'March 2026',
  },
  goals: {
    type: [String],
    default: [],
  },
  techStack: {
    type: [{ name: String, iconType: String }],
    default: [],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
