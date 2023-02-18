import express from "express";
const router = express.Router();
import authRoutes from "./auth.js";
import usersRoutes from "./users.js";
import checkAuth from "../utils/checkAuth.js";

router.use("/auth", authRoutes);
router.use("/users", checkAuth, usersRoutes);
export default router;
