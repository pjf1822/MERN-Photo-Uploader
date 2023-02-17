import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  // assign req.body
  console.log(req.body);
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
  console.log("got this far");

  // does the user already exist
  const userExists = await User.findOne({ email });
  console.log("apparently the user doesnt exist");

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
    const user = await User.findOne({ email }).select(
      "username email password"
    );
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

    const payload = {
      id: user._id,
      username: user.username,
    };

    // create jsonwebtoken for the cookie
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // assign the cookie and return the status/json
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
      })
      .status(200)
      .json({
        username: user.username,
        email: user.email,
        password: user.password,
        message: "login success",
      });
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).json({ message: "logged out" });
};

export const isLoggedIn = async (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.json(false);
  }
  return jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.json(false);
    }
    return res.json(true);
  });
};
