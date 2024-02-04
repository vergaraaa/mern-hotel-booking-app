import { Router } from "express";
import { check } from 'express-validator';
import { register } from "../controllers/users";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

router.post('/register', [
    check("name", "Name is required").isString(),
    check("lastname", "Lastname is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
    validateFields,
], register);

export default router;