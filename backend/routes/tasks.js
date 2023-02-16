import express from "express";
const router = express.Router();

router.get("/hello", (req, res) => {
  console.log(req.user);
  res.json("hello world");
});

export default router;
