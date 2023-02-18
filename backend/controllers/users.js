import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const updateUsername = async (req, res, next) => {
  // pull info from request
  const id = req.user.id;
  const { username, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
      },
      {
        new: true,
      }
    ).select("username email");
    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(err);
  }
};

export const getUserInfo = async (req, res, next) => {
  // get id from the cookies
  const { id } = req.user;
  try {
    const userExists = await User.findById(id).select("username email");
    return res.status(200).json(userExists);
  } catch (error) {
    return next(error);
  }
};

export const changePassword = async (req, res, next) => {
  const id = req.user.id;
  const { oldPassword, newPassword } = req.body;
  const getUser = await User.findById(id);

  //Validate
  if (!oldPassword || !newPassword) {
    return next(
      createError({ status: 400, message: "Please add old and new password" })
    );
  }

  // check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, getUser.password);

  // new password encryption
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  //   if everything is good we assign the new password  and save the user
  if (getUser && passwordIsCorrect) {
    getUser.password = hashedPassword;
    await getUser.save();
    res.status(200).send("Password change successful");
  } else {
    return next(createError({ status: 400, message: "old password is wrong" }));
  }
};
