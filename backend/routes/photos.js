import express from "express";
import { getAllPhotos, uploadPhoto } from "../controllers/photos.js";
const router = express.Router();

router.get("/getall", getAllPhotos);
router.post("/uploads", uploadPhoto);

export default router;
