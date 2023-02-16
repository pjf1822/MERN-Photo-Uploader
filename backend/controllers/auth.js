import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res) => {
  // assign req.body
  const { username, email, password } = req.body;

  // all fields must be filled out
  if (!username || !email || !password) {
    return next(
      createError({
        message: "Name, Email & password are required",
        statusCode: 400,
      })
    );
  }

  // does the user already exist
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send("this user already exists");
  }
  // create hashedpassword and store user
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    return res.status(201).json({ message: "good job" });
  } catch (error) {
    return next(err);
  }
};

export const login = async (req, res, next) => {
  // assign req.body
  const { email, password } = req.body;

  // all fields must be filled out
  if (!email || !password) {
    return res.status(400).json({ message: "required username and password" });
  }

  // check if user exists
  try {
    const user = await User.findOne({ email }).select("name email password");

    if (!user) {
      return next(
        createError({ status: 404, message: "User not found with the email" })
      );
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(
        createError({ status: 400, message: "Password is incorrect" })
      );
    }

    // create jsonwebtoken for the cookie
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // assign the cookie and return the status/json
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
      })
      .status(200)
      .json({ name: user.name, email: user.email, message: "login success" });
  } catch (error) {
    return next(err);
  }
};
