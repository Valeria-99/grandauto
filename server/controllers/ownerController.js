import { v2 as cloudinary } from "cloudinary";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";
import path from "path";

// Cloudinary конфіг
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API to Change Role of User
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to Add Car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const carData = JSON.parse(req.body.carData);

    if (!req.file) {
      return res.json({ success: false, message: "No image file provided" });
    }

    let imageUrl;

    try {
      // Основний варіант: завантаження у Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "cars",
        transformation: [{ width: 1280, quality: "auto", format: "webp" }],
      });
      imageUrl = uploadResponse.secure_url;
    } catch (cloudError) {
      console.error("Cloudinary error:", cloudError.message);

      // Fallback: збереження локально
      const localPath = path.join("uploads", req.file.originalname);
      fs.writeFileSync(localPath, req.file.buffer);
      imageUrl = `/uploads/${req.file.originalname}`;
    }

    const newCar = await Car.create({
      ...carData,
      owner: _id,
      image: imageUrl,
    });

    res.json({ success: true, message: "Car Added", car: newCar });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


