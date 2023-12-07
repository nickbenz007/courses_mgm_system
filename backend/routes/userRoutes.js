import express from "express";
import {
  createUser,
  logOutUser,
  getUserProfile,
  getAllUsers,
  updateUser,
  updateUserProfile,
  deleteUser,
} from "../controller/userController.js";

const router = express.Router();
router.post("/create-user", createUser);
router.post("/logout", logOutUser);
router.get("/", getAllUsers);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);

export default router;
