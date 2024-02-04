import jwt from 'jsonwebtoken';
import User from "../models/User";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if(user) {
            return res.status(400).json({
                status: "failure",
                message: "User already exists",
            });
        }

        user = new User(req.body);

        await user.save();

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET_KEY as string,
            { 
                expiresIn: "1d" 
            }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: "failure",
            message: "Something went wrong",
        });
    }
}