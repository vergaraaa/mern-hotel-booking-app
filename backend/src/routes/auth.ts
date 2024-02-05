import { Router } from "express";
import { check } from 'express-validator';
import { verifyToken } from "../middlewares/verify-token";
import { login, validateToken } from "../controllers/auth";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

router.post('/login', [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").notEmpty(),
    validateFields,
], login);

router.get('/validate-token', verifyToken, validateToken);

export default router;