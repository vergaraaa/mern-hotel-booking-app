"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const verify_token_1 = require("../middlewares/verify-token");
const auth_1 = require("../controllers/auth");
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").notEmpty(),
    validate_fields_1.validateFields,
], auth_1.login);
router.get('/validate-token', verify_token_1.verifyToken, auth_1.validateToken);
router.post('/logout', auth_1.logout);
exports.default = router;
