import User from "../models/User.js";
import bcrypt from "bcryptjs";

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

export const login = async (req, res) => {
  res.send("hey");
};
