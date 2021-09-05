import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  //   console.log(token);
  jwt.verify(
    token,
    process.env.SECRET_KEY || "somethingsecret",
    (err, payload) => {
      if (err) {
        return res.status(401).json({ error: "you must be logged in" });
      }
      const { _id } = payload;
      User.findById(_id).then((userdata) => {
        req.user = userdata;
        // console.log(userdata);
        next();
      });
    }
  );
});

export default authMiddleware;
