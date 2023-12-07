import jwt from "jsonwebtoken";
import User from "../models/User.js";
import expressAsyncHandler from "express-async-handler";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      const user = await User.findById(decoded.userId);

      if (!user) {
        res.status(401);
        throw new Error("Not authorized User not found");
      }

      req.user = user;

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized Invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized No token");
  }
});

export { protect };
