import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const updateUser = async (req, res, next) => {
  // pull info from request
  const { id } = req.user.id;
  const { name, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
      },
      {
        new: true,
      }
    ).select("name email");
    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(err);
  }
};

export const getUserInfo = async (req, res, next) => {
  // get id from the cookies
  const { id } = req.user.id;

  try {
    const userExists = await User.findOne({ id }).select("email username");
    return res.status(200).json(userExists);
  } catch (error) {
    return next(err);
  }
};
