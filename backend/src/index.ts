import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// settings
app.set('port', 3000 || process.env.PORT);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// test route
app.get("/api/test", async(req: Request, res: Response) => {
    res.json({ message: 'Hello from test endpoint' });
});

// server lostening
app.listen(app.get("port"), () => {
    console.log("server running on port", app.get("port"));
});