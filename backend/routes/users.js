import express from "express";
const router = express.Router();
import { getUserInfo, updateUser } from "../controllers/users.js";

router.get("/me", getUserInfo);
router.put("/me", updateUser);

export default router;
