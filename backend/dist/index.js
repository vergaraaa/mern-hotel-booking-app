"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const my_hotels_1 = __importDefault(require("./routes/my-hotels"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cloudinary_1 = require("cloudinary");
// db connection
mongoose_1.default
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("db connected"));
// cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// init app
const app = (0, express_1.default)();
// settings
app.set("port", 3000 || process.env.PORT);
// middlewares
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
// routes
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.use("/api/my-hotels", my_hotels_1.default);
// server lostening
app.listen(app.get("port"), () => {
    console.log("server running on port", app.get("port"));
});
