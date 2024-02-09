import { Request, Response } from "express";
import { generateJWT } from "../helpers/jwt";
import cloudinary from "cloudinary";

export const createHotel = async (req: Request, res: Response) => {
  try {
    const newHotel = req.body;
    const imageFiles = req.files as Express.Multer.File[];

    // upload images to cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);

      return res.url;
    });

    // add urls to new hotel if successful

    // save the nuew hotel in our database

    // return
    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "failure",
      message: "Error creating hotel",
    });
  }
};
