import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { ensureSeedData } from './utils/bootstrapData.js';

// Routes
import projectRoutes from './routes/projectRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';

// Load environment variables
dotenv.config();

// Verify required environment variables
if (!process.env.MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI is not defined in .env file');
  console.error('Please create a .env file in the server directory with:');
  console.error('MONGODB_URI=your_mongodb_connection_string');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    await ensureSeedData();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

