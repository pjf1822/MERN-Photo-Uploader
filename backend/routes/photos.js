import express from "express";
const router = express.Router();
import { getPhotos } from "../controllers/photos.js";

router.get("/photos", getPhotos);

export default router;
