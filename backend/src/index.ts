import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import mongose from 'mongoose';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import cookieParser from 'cookie-parser';

// db connection
mongose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log('db connected'));


// init app
const app = express();


// settings
app.set('port', 3000 || process.env.PORT);


// middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


// server lostening
app.listen(app.get("port"), () => {
    console.log("server running on port", app.get("port"));
});