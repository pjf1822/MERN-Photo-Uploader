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

export const deletePhoto = async (req, res) => {
  console.log(req.params, "these are the req params");

  try {
    await Photo.findByIdAndDelete(req.params.id);
    return res.json("Task Deleted Successfully");
  } catch (err) {
    return res.send(err);
  }
};

export const getUsersPhotos = async (req, res) => {
  console.log(req.user, "this is the current user");
  try {
    const photos = await Photo.find({ user: req.user.id });
    console.log(photos, "this si the array of photos for this user");
    return res.status(200).json(photos);
  } catch (err) {
    return next(err);
  }
};
