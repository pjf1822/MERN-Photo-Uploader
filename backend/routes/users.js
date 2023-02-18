import express from "express";
const router = express.Router();
import {
  getUserInfo,
  updateUsername,
  changePassword,
  getPassword,
} from "../controllers/users.js";

router.get("/me", getUserInfo);
router.put("/me", updateUsername);
router.put("/me/change_password", changePassword);
router.get("/me/password", getPassword);

export default router;
