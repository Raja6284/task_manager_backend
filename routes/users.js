// const express = require("express")
// const jwt = require("jsonwebtoken")
// const User = require("../models/User")
// const auth = require("../middleware/auth")

// const router = express.Router()

// // Register a new user
// router.post("/register", async (req, res) => {
//   try {
//     const user = new User(req.body)
//     await user.save()

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     })

//     res.status(201).send({ user, token })
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

// // Login user
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body
//     const user = await User.findOne({ email })

//     if (!user) {
//       return res.status(401).send({ error: "Invalid login credentials" })
//     }

//     const isPasswordMatch = await user.comparePassword(password)
//     if (!isPasswordMatch) {
//       return res.status(401).send({ error: "Invalid login credentials" })
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     })

//     res.send({ user, token })
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

// // Get user profile
// router.get("/me", auth, async (req, res) => {
//   res.send(req.user)
// })

// // Logout user
// router.post("/logout", auth, async (req, res) => {
//   try {
//     res.send({ message: "Logged out successfully" })
//   } catch (error) {
//     res.status(500).send()
//   }
// })

// module.exports = router





import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ error: "Invalid login credentials" });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).send({ error: "Invalid login credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get user profile
router.get("/me", auth, async (req, res) => {
  res.send(req.user);
});

// Logout user
router.post("/logout", auth, async (req, res) => {
  try {
    res.send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
