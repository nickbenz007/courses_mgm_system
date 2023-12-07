import jwt from "jsonwebtoken";

const generateToken = async (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // secure cookies in productions mode
    sameSite: "strict", // Avoid CSRF Attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
