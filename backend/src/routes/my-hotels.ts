import multer from "multer";
import { Router } from "express";
import { body, check } from "express-validator";
import { createHotel, getMyHotels } from "../controllers/my-hotels";
import { verifyToken } from "../middlewares/verify-token";

const router = Router();

// multer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.get("/", verifyToken, getMyHotels);

router.post(
  "/",
  [
    verifyToken,
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("adultCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Adult count is required"),
    body("childCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Child count is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required"),
    upload.array("imageFiles", 6),
  ],
  createHotel
);

export default router;
