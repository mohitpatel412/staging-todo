import express from "express";
import authMiddleware from "../auth/authMiddleware.js";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/todoRouter.js";

const todoRouter = express.Router();

todoRouter.get("/", authMiddleware, getPosts);
todoRouter.post("/", authMiddleware, createPost);
todoRouter.put("/:id", authMiddleware, updatePost);
todoRouter.delete("/:id", authMiddleware, deletePost);

export default todoRouter;
