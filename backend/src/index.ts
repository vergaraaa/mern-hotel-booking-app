import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import mongose from 'mongoose';
import userRoutes from './routes/users';
import express, { Request, Response } from 'express';

// db connection
mongose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log('db connected'));


// init app
const app = express();


// settings
app.set('port', 3000 || process.env.PORT);


// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/api/users', userRoutes);


// server lostening
app.listen(app.get("port"), () => {
    console.log("server running on port", app.get("port"));
});