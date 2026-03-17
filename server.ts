import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import dbConnect from './lib/mongodb';
import Project from './models/Project';
import Message from './models/Message';
import Admin from './models/Admin';
import Analytics from './models/Analytics';
import Settings from './models/Settings';
import Feedback from './models/Feedback';

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

if (!process.env.MONGODB_URI) {
  console.error("CRITICAL ERROR: MONGODB_URI is not defined in environment variables.");
}

// Configure Cloudinary
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dmoboiirw',
  api_key: process.env.CLOUDINARY_API_KEY || '274973358699138',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'UmDN63xbyl0lmVb4-uZAjXTs6hs'
};

if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL
  });
} else {
  cloudinary.config(cloudinaryConfig);
}

// Configure Multer (Only for small metadata if needed, but we'll use JSON for projects)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } 
});

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static('uploads'));

// Cloudinary Signing API (For secure client-side uploads)
app.get('/api/upload/sign', (req, res) => {
  try {
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: 'portfolio',
      },
      cloudinaryConfig.api_secret
    );

    res.status(200).json({
      success: true,
      signature,
      timestamp,
      cloud_name: cloudinaryConfig.cloud_name,
      api_key: cloudinaryConfig.api_key,
      folder: 'portfolio'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

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

app.post('/api/projects', async (req, res) => {
  try {
    await dbConnect();
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.put('/api/projects', async (req, res) => {
  try {
    await dbConnect();
    const { id, ...updateData } = req.body;
    if (!id) return res.status(400).json({ success: false, error: 'Project ID is required' });
    const project = await Project.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.status(200).json({ success: true, data: project });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.delete('/api/projects', async (req, res) => {
  try {
    await dbConnect();
    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, error: 'Project ID is required' });
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.status(200).json({ success: true, data: project });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Contact Form API
app.post('/api/contact', async (req, res) => {
  try {
    await dbConnect();
    const { name, email, message, service, budget } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Please provide all fields.' });
    }

    const newMessage = await Message.create({ name, email, message, service, budget });
    res.status(201).json({ success: true, data: newMessage });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Feedback API
app.post('/api/feedback', async (req, res) => {
  try {
    await dbConnect();
    const { projectId, name, email, message, rating } = req.body;
    
    if (!projectId || !name || !email || !message || !rating) {
      return res.status(400).json({ success: false, error: 'Please provide all fields.' });
    }

    const newFeedback = await Feedback.create({ projectId, name, email, message, rating });
    res.status(201).json({ success: true, data: newFeedback });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    await dbConnect();
    const { projectId } = req.query;
    const query = projectId ? { projectId } : {};
    const feedbacks = await Feedback.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: feedbacks });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.delete('/api/feedback', async (req, res) => {
  try {
    await dbConnect();
    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, error: 'Feedback ID is required' });
    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) return res.status(404).json({ success: false, error: 'Feedback not found' });
    res.status(200).json({ success: true, data: feedback });
  } catch (error: any) {
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

app.delete('/api/messages', async (req, res) => {
  try {
    await dbConnect();
    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, error: 'Message ID is required' });
    const message = await Message.findByIdAndDelete(id);
    if (!message) return res.status(404).json({ success: false, error: 'Message not found' });
    res.status(200).json({ success: true, data: message });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Admin API
const sendVerificationEmail = async (email: string, code: string) => {
  try {
    console.log(`Attempting to send verification email to: ${email}`);
    // For real usage, you should use your real SMTP credentials in .env
    // Here we use Ethereal for testing if no credentials are provided
    let transporter;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log("Using provided SMTP credentials");
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      console.log("No SMTP credentials found, creating Ethereal test account...");
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER ? `"Admin Panel" <${process.env.EMAIL_USER}>` : '"Admin Panel" <admin@example.com>',
      to: email,
      subject: "Your Password Reset Code",
      text: `Your verification code is: ${code}`,
      html: `<b>Your verification code is: ${code}</b>`,
    });

    console.log("Message sent: %s", info.messageId);
    if (!process.env.EMAIL_USER) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(`Email sending failed: ${error instanceof Error ? error.message : String(error)}`);
  }
};

app.get('/api/admin', async (req, res) => {
  try {
    await dbConnect();
    let admin = await Admin.findOne({});
    if (!admin) {
      admin = await Admin.create({ username: 'fahadmalik', password: 'fahadmalik123', email: 'fahaddesigner05@gmail.com' });
    }
    res.status(200).json({ success: true, data: { username: admin.username, password: admin.password, email: admin.email } });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post('/api/admin', async (req, res) => {
  try {
    await dbConnect();
    const { username, password } = req.body;
    let admin = await Admin.findOne({});
    if (!admin) {
      admin = await Admin.create({ username: 'fahadmalik', password: 'fahadmalik123', email: 'fahaddesigner05@gmail.com' });
    }
    if (username === admin.username && password === admin.password) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.put('/api/admin', async (req, res) => {
  try {
    await dbConnect();
    const { username, password, email } = req.body;
    let admin = await Admin.findOne({});
    if (!admin) {
      admin = await Admin.create({ username: 'fahadmalik', password: 'fahadmalik123', email: 'fahaddesigner05@gmail.com' });
    }
    if (username) admin.username = username;
    if (password) admin.password = password;
    if (email) admin.email = email;
    await admin.save();
    res.status(200).json({ success: true, data: { username: admin.username, password: admin.password, email: admin.email } });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post('/api/admin/forgot-password', async (req, res) => {
  try {
    console.log("Forgot password request received");
    await dbConnect();
    let admin = await Admin.findOne({});
    if (!admin) {
      console.log("No admin found, creating default admin");
      admin = await Admin.create({ username: 'fahadmalik', password: 'fahadmalik123', email: 'fahaddesigner05@gmail.com' });
    }
    
    // Generate 6 digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    admin.resetCode = code;
    admin.resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await admin.save();
    console.log(`Reset code generated for ${admin.email}`);

    await sendVerificationEmail(admin.email, code);

    res.status(200).json({ success: true, message: 'Verification code sent to email' });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    res.status(500).json({ success: false, error: error.message || "Internal server error" });
  }
});

app.post('/api/admin/verify-code', async (req, res) => {
  try {
    await dbConnect();
    const { code } = req.body;
    const admin = await Admin.findOne({});
    
    if (!admin || !admin.resetCode || !admin.resetCodeExpires) {
      return res.status(400).json({ success: false, error: 'No reset request found' });
    }

    if (new Date() > admin.resetCodeExpires) {
      return res.status(400).json({ success: false, error: 'Code expired' });
    }

    if (admin.resetCode !== code) {
      return res.status(400).json({ success: false, error: 'Invalid code' });
    }

    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post('/api/admin/reset-password', async (req, res) => {
  try {
    await dbConnect();
    const { code, newPassword } = req.body;
    const admin = await Admin.findOne({});
    
    if (!admin || !admin.resetCode || !admin.resetCodeExpires) {
      return res.status(400).json({ success: false, error: 'No reset request found' });
    }

    if (new Date() > admin.resetCodeExpires) {
      return res.status(400).json({ success: false, error: 'Code expired' });
    }

    if (admin.resetCode !== code) {
      return res.status(400).json({ success: false, error: 'Invalid code' });
    }

    admin.password = newPassword;
    admin.resetCode = undefined;
    admin.resetCodeExpires = undefined;
    await admin.save();

    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Settings API
app.get('/api/settings', async (req, res) => {
  try {
    await dbConnect();
    let settings = await Settings.findOne({});
    if (!settings) {
      settings = await Settings.create({ aboutVideoLink: '' });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    await dbConnect();
    let settings = await Settings.findOne({});
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findOneAndUpdate({}, req.body, { new: true });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Analytics API
app.get('/api/analytics', async (req, res) => {
  try {
    await dbConnect();
    const analytics = await Analytics.find({});
    const data = {
      views: analytics.find(a => a.type === 'views')?.count || 0,
      clicks: analytics.find(a => a.type === 'clicks')?.count || 0,
    };
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post('/api/analytics', async (req, res) => {
  try {
    await dbConnect();
    const { type } = req.body;
    if (!type || !['views', 'clicks'].includes(type)) {
      return res.status(400).json({ success: false, error: 'Invalid analytic type' });
    }
    const analytic = await Analytics.findOneAndUpdate(
      { type },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    res.status(200).json({ success: true, data: analytic });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.delete('/api/analytics/reset', async (req, res) => {
  try {
    await dbConnect();
    await Analytics.updateMany({}, { $set: { count: 0 } });
    res.status(200).json({ success: true, message: 'Analytics reset successfully' });
  } catch (error: any) {
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
        description: "A high-end branding project for a tech startup focused on established a robust and trustworthy online identity.",
        img: "https://picsum.photos/seed/qnt/800/600",
        color: "cyan",
        role: "Lead Designer",
        timeline: "March 2026",
        goals: ["Establish a robust and trustworthy online identity", "Complete a full-scale, responsive build"],
        techStack: [{ name: "Wordpress", iconType: "Globe" }, { name: "Elementor", iconType: "Layout" }]
      },
      {
        title: "Nebula UI Kit",
        category: "Mobile Design",
        description: "A comprehensive UI kit for mobile applications with high-end CSS styling and optimized performance.",
        img: "https://picsum.photos/seed/neb/800/600",
        color: "purple",
        role: "UI/UX Designer",
        timeline: "February 2026",
        goals: ["Create a versatile UI kit", "Implement high-end CSS styling"],
        techStack: [{ name: "React", iconType: "Code" }, { name: "Framer Motion", iconType: "Layers" }]
      },
      {
        title: "Ether Dashboard",
        category: "Web Application",
        description: "A sleek dashboard for a data analytics platform with real-time data visualization.",
        img: "https://picsum.photos/seed/eth/800/600",
        color: "cyan",
        role: "Full Stack Developer",
        timeline: "January 2026",
        goals: ["Optimize for search engines (SEO)", "Build a real-time dashboard"],
        techStack: [{ name: "Node.js", iconType: "Code" }, { name: "MongoDB", iconType: "Layers" }]
      }
    ];
    
    await Project.deleteMany({}); // Clear existing
    const projects = await Project.insertMany(sampleProjects);
    res.status(201).json({ success: true, data: projects });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal Server Error', 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

async function startServer() {
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

// Export for Vercel
export default app;

// Only start the server if not on Vercel (local dev)
if (!process.env.VERCEL) {
  startServer();
}
