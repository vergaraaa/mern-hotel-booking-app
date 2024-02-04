import { Request, Response, NextFunction } from "express";
import { validationResult, Result, ValidationError } from "express-validator";

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'failure',
            errors: errors.array(),
        });
    }

    next();
}