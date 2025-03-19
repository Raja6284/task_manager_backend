// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")
// const dotenv = require("dotenv")
// const taskRoutes = require("./routes/tasks")
// const userRoutes = require("./routes/users")

// // Load environment variables
// dotenv.config()

// const app = express()
// const PORT = process.env.PORT || 5000

// // Middleware
// app.use(cors())
// app.use(express.json())

// // Routes
// app.use("/api/tasks", taskRoutes)
// app.use("/api/users", userRoutes)

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("Connected to MongoDB")
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`)
//     })
//   })
//   .catch((error) => {
//     console.error("MongoDB connection error:", error)
//   })



import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks.js";
import userRoutes from "./routes/users.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
