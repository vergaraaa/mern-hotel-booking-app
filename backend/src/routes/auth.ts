import { Router } from "express";
import { check } from 'express-validator';
import { validateFields } from "../middlewares/validate-fields";
import { login } from "../controllers/auth";

const router = Router();

router.post('/login', [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").notEmpty(),
    validateFields,
], login);

export default router;