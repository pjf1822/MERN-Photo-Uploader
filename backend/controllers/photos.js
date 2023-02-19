import Photo from "../models/Photo.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const getAllPhotos = async (req, res, next) => {
  try {
    Photo.find({}).then((data) => {
      res.json(data);
    });
  } catch (error) {
    res.status(400).json({ message: "find all th ephotso" });
  }
};

export const uploadPhoto = async (req, res, next) => {
  const body = req.body;

  try {
    const newImage = await Photo.create(body);
    newImage.save();
    res.status(201).json({ message: "new uploaded" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
