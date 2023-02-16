import express from "express";
const router = express.Router();
import tasksRoutes from "./tasks.js";
import authRoutes from "./auth.js";
import usersRoutes from "./users.js";

router.use("/auth", authRoutes);
router.use("/tasks", tasksRoutes);
router.use("/users", usersRoutes);
export default router;
