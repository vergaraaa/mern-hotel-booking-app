import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import { Request, Response } from "express";

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
    const imageUrls = await uploadImages(imageFiles);

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

export const getHotelDetail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id.toString();

    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });

    res.status(200).json(hotel);
  } catch (e) {
    console.log("Error getting hotel: ", e);

    return res.status(500).json({
      status: "failure",
      message: "Error getting hotel",
    });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();

    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({
        status: "failure",
        message: "Hotel not found",
      });
    }

    const files = req.files as Express.Multer.File[];

    const updatedImageUrls = await uploadImages(files);

    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();

    res.status(201).json(hotel);
  } catch (e) {
    console.log("Error updating hotel: ", e);

    return res.status(500).json({
      status: "failure",
      message: "Error updating hotel",
    });
  }
};

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);

    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);

  return imageUrls;
}
