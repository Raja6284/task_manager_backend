// const jwt = require("jsonwebtoken")
// const User = require("../models/User")

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "")
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     const user = await User.findOne({ _id: decoded.id })

//     if (!user) {
//       throw new Error()
//     }

//     req.token = token
//     req.user = user
//     next()
//   } catch (error) {
//     res.status(401).send({ error: "Please authenticate." })
//   }
// }

// module.exports = auth




import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;
