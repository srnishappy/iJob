import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRouter from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';
import path from "path";

dotenv.config();
const app = express();

const _dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: 'https://ijob-hlip.onrender.com',
  credentials: true,
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;

app.use('/api/user', userRouter);
app.use('/api/company', companyRoute);
app.use('/api/job', jobRoute);
app.use('/api/application', applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.use((req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});