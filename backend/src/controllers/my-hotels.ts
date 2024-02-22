import cloudinary from "cloudinary";
import { Request, Response } from "express";
import Hotel, { HotelType } from "../models/hotel";

export const getMyHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });

    res.status(200).json(hotels);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "failure",
      message: "Error fetching hotels",
    });
  }
};

export const createHotel = async (req: Request, res: Response) => {
  try {
    const newHotel: HotelType = req.body;
    const imageFiles = req.files as Express.Multer.File[];

    // upload images to cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);

      return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);

    // add urls to new hotel if successful
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    // save the new hotel in our database
    const hotel = new Hotel(newHotel);
    await hotel.save();

    // return
    return res.status(201).json({
      status: "success",
      hotel,
    });
  } catch (e) {
    console.log("Error creating hotel: ", e);

    return res.status(500).json({
      status: "failure",
      message: "Error creating hotel",
    });
  }
};
