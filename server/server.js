import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import connectDB from './config/database.js';
import studentRoutes from './routes/studentRouter.js';
import teacherRouter from './routes/teacherRoutes.js';
import classRouter from './routes/classRoutes.js';
import assignmentRouter from './routes/assignmentRoutes.js';
import submissionRouter from './routes/submissionRoutes.js';
import aiChatRouter from './routes/aiChatRoutes.js';
import videoRouter from './routes/videoRoutes.js';
import syllabusRouter from './routes/syllabusRoutes.js';
import gameRouter from './routes/gameRoutes.js';
import achievementRouter from './routes/achievementRoutes.js';
import videoLessonRouter from './routes/videoLessonRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import adminRouter from './routes/adminRoutes.js';

const app = express();
const port = process.env.PORT;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads/assignments');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create videos uploads directory
const videosDir = path.join(__dirname, 'uploads/videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

await connectDB();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/teacher', teacherRouter);
app.use('/api/student', studentRoutes);
app.use('/api/class', classRouter);
app.use('/api/assignment', assignmentRouter);
app.use('/api/submission', submissionRouter);
app.use('/api/ai-chat', aiChatRouter);
app.use('/api/video', videoRouter);
app.use('/api/admin', adminRouter);
app.use('/api/syllabus', syllabusRouter);
app.use('/api/game', gameRouter);
app.use('/api/achievement', achievementRouter);
app.use('/api/video-lesson', videoLessonRouter);



app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})

