import mongoose from 'mongoose';

export interface IAnalytics extends mongoose.Document {
  type: 'views' | 'clicks';
  count: number;
}

const AnalyticsSchema = new mongoose.Schema<IAnalytics>({
  type: {
    type: String,
    required: true,
    unique: true,
    enum: ['views', 'clicks'],
  },
  count: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
