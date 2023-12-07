import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToDataBase from "./config/db.js";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import coursesRoutes from "./routes/courseRoutes.js";
import lectureRoutes from "./routes/lectureRoutes.js";
import assignmentsRoutes from "./routes/assignmentsRoutes.js";
import { authenticateUser } from "./controller/userController.js";
dotenv.config();

connectToDataBase();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/login", authenticateUser);
app.use("/api/users", userRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/assignments", assignmentsRoutes);
// app.use("/api/assignments/:courseId");

app.get("/", (req, res) => res.send("Server is Up & Running"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is listening to PORT: ${PORT}`.bold.cyan),
);
