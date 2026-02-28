import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import dbConnect from './lib/mongodb';
import Project from './models/Project';
import Message from './models/Message';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Projects API
  app.get('/api/projects', async (req, res) => {
    try {
      await dbConnect();
      const projects = await Project.find({}).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: projects });
    } catch (error: any) {
      console.error('API Error:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // Contact Form API
  app.post('/api/contact', async (req, res) => {
    try {
      await dbConnect();
      const { name, email, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Please provide all fields.' });
      }

      const newMessage = await Message.create({ name, email, message });
      res.status(201).json({ success: true, data: newMessage });
    } catch (error: any) {
      console.error('API Error:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // Messages API (for Admin)
  app.get('/api/messages', async (req, res) => {
    try {
      await dbConnect();
      const messages = await Message.find({}).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: messages });
    } catch (error: any) {
      console.error('API Error:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // Seed Route (Optional, for initial testing)
  app.post('/api/projects/seed', async (req, res) => {
    try {
      await dbConnect();
      const sampleProjects = [
        {
          title: "Quantum Branding",
          category: "Identity Design",
          description: "A high-end branding project for a tech startup.",
          img: "https://picsum.photos/seed/qnt/800/600",
          color: "cyan"
        },
        {
          title: "Nebula UI Kit",
          category: "Mobile Design",
          description: "A comprehensive UI kit for mobile applications.",
          img: "https://picsum.photos/seed/neb/800/600",
          color: "purple"
        },
        {
          title: "Ether Dashboard",
          category: "Web Application",
          description: "A sleek dashboard for a data analytics platform.",
          img: "https://picsum.photos/seed/eth/800/600",
          color: "pink"
        },
        {
          title: "Cyberpunk 2077 Art",
          category: "Illustration",
          description: "A futuristic illustration inspired by Cyberpunk 2077.",
          img: "https://picsum.photos/seed/cyb/800/600",
          color: "blue"
        }
      ];
      
      await Project.deleteMany({}); // Clear existing
      const projects = await Project.insertMany(sampleProjects);
      res.status(201).json({ success: true, data: projects });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
