import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json("no token avail");
  }
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json("invalid token");
    }
    req.user = decoded;
    return next();
  });
};
