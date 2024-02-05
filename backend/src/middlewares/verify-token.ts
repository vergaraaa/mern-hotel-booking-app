import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];

    if(!token) {
        return res.status(401).json({
            status: "failure",
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        req.userId = (decoded as JwtPayload).userId;

        next();
    } catch (error) {
        return res.status(401).json({
            status: "failure",
            message: "Unauthorized"
        });
    }
}