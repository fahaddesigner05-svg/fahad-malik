import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from '../lib/mongodb';
import Project from '../models/Project';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: projects });
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(400).json({ success: false, error: error.message });
  }
}
