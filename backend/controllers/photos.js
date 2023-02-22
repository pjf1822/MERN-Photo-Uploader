import Photo from "../models/Photo.js";
import User from "../models/User.js";
import mongoose from "mongoose";

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
  let existingUser;

  try {
    existingUser = await User.findById(req.user.id);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  let photo;
  try {
    photo = new Photo({
      myFile: req.body.myFile,
      user: req.user.id,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.photos.push(photo);

    await existingUser.save({ session });
    photo = await photo.save({ session });
    session.commitTransaction();
  } catch (error) {
    console.log(error);
  }

  // newPhoto.save();
  res.status(201).json({ message: "new uploaded" });
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
  try {
    const photos = await Photo.find({ user: req.user.id });
    return res.status(200).json(photos);
  } catch (err) {
    return next(err);
  }
};
