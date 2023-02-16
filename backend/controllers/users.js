import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const updateUser = async (req, res, next) => {};

export const getUserInfo = async (req, res, next) => {
  const { id } = req.user.id;

  try {
    const userExists = await User.findOne({ id }).select("email username");
    return res.status(200).json(userExists);
  } catch (error) {
    return next(err);
  }
};
