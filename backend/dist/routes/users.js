"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_1 = require("../controllers/users");
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.check)("name", "Name is required").isString(),
    (0, express_validator_1.check)("lastname", "Lastname is required").isString(),
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password with 6 or more characters required").isLength({ min: 6 }),
    validate_fields_1.validateFields,
], users_1.register);
exports.default = router;
