import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

/* Description: Authenticate User/(Set Token)
 * Route: POST /api/login
 * Access: Public
 */
const authenticateUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!password) {
    res.status(404).json({
      success: false,
      message: "Invalid credentials, Please enter correct password.",
    });
  }

  if (user && (await user.matchPassword(password))) {
    await generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      courses: user.courses,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid credentials, Please enter correct email & password",
    });
  }
});

/* Description: Create new user
 * Route: POST /api/users/create-user
 * Access: Private
 * Auto generated password
 */
const generateRandomPassword = (length) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
};

const createUser = expressAsyncHandler(async (req, res) => {
  const { name, email, role } = req.body;
  const userExist = await User.findOne({ email });
  const password = generateRandomPassword(8);

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    role,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      password: password,
    });
  } else {
    res.status(500);
    throw new Error("Invalid user data");
  }
});

/* Description: Get All Users
 * Route: GET /api/users
 * Access: Private
 */
const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find();

    if (!allUsers || allUsers.length === 0) {
      res.status(404);
      throw new Error("No users data found");
    }

    res.status(200).json(allUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

/* Description: Get user Profile
 * Route: POST /api/users/profile
 * Access: Private (We have to have token or fully authenticated)
 */
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  };
  res.status(201).json(user);
});

/* Description: Update user Profile
 * Route: POST /api/users/profile
 * Access: Private (We have to have token or fully authenticated)
 */
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("Oops.! Something went wrong");
  }
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByIdAndUpdate(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name;
  user.email = req.body.email;
  user.role = req.body.role;

  const updatedUser = await user.save();

  res.status(200).json({
    message: "User updated successfully",
    success: updatedUser,
  });
});

/* Description: Delete user
 * Route: DELETE /api/users/:id
 * Access: Private
 */
const deleteUser = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "User can not be deleted." });
    }

    res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting User:", error);
    res.status(500).json({
      error,
      success: false,
      message: "Internal Server Error",
    });
  }
});

/* Description: Logout user
 * Route: POST /api/users/logout
 * Access: Public
 */
const logOutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200).json({
    message: "You are logged out successfully",
  });
});

export {
  authenticateUser,
  createUser,
  logOutUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  updateUser,
  deleteUser,
};
