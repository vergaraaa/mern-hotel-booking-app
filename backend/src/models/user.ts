import bcrypt from 'bcryptjs';
import { Schema, model } from "mongoose";

export type UserType = {
    _id: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
});

UserSchema.pre("save", async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    } 
    
    next();
});

const User = model<UserType>("User", UserSchema);

export default User;