import express from "express";
import {
  getAllPhotos,
  uploadPhoto,
  deletePhoto,
  getUsersPhotos,
} from "../controllers/photos.js";
const router = express.Router();

router.get("/getall", getAllPhotos);
router.get("/getusersphotos", getUsersPhotos);
router.post("/uploads", uploadPhoto);
router.delete("/delete/:id", deletePhoto);

export default router;
