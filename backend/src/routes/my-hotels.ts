import multer from "multer";
import { Router } from "express";
import { check } from "express-validator";
import { createHotel } from "../controllers/my-hotels";

const router = Router();

// multer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post("/", [upload.array("imageFiles", 6)], createHotel);
