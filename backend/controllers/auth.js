import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json("all field names are required");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send("this user already exists");
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    return res.status(201).json({ message: "good job" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "required username and password" });
  }

  try {
    const user = await User.findOne({ email }).select("name email password");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
      })
      .status(200)
      .json({ name: user.name, email: user.email, message: "login success" });
  } catch (error) {
    res.json(error);
  }
};
