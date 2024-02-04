import bcrypt from 'bcryptjs';
import User from "../models/User";
import { Request, Response } from "express";
import { generateJWT } from '../helpers/jwt';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({
                status: "failure",
                message: "User does not exist",
            });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            return res.status(409).json({
                status: "failure",
                message: "Incorrect password",
            });
        }

        const token = generateJWT(user._id);

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });

        return res.status(200).json({ userId: user._id });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: "failure",
            message: "Something went wrong",
        });
    }
}