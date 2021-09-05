import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils.js";
import authMiddleware from "../auth/authMiddleware.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});  // To remove all Users
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
          todos: user.todos,
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 8),
    });
    const createUser = await user.save();

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(createUser),
      todos: user.todos,
    });
  })
);

export default userRouter;
