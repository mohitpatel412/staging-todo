import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Todo from "../models/Todo.js";

export const getPosts = expressAsyncHandler(async (req, res) => {
  try {
    const Todos = await Todo.find({ user: req.user._id }).sort({
      updatedAt: -1,
    });
    // console.log(req.user._id);
    // console.log(Todos);

    res.status(200).json(Todos);
    return;
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const createPost = expressAsyncHandler(async (req, res) => {
  // const {title,creator,description,selectedFile} = req.body;
  const newPost = new Todo({
    title: req.body.title,
    creator: req.body.creator,
    description: req.body.description,
    fontSize: req.body.fontSize,
    selectedFile: req.body.selectedFile,
    user: req.user._id,
  });
  try {
    newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

export const updatePost = async (req, res) => {
  // console.log("Update");
  const { id } = req.params;
  // const { title, description, creator, selectedFile } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = {
    creator: req.body.creator,
    title: req.body.title,
    description: req.body.description,
    fontSize: req.body.fontSize,
    selectedFile: req.body.selectedFile,
    _id: id,
    user: req.user._id,
  };

  await Todo.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = expressAsyncHandler(async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return req.status(404).send("No post with this id");

  await Todo.findByIdAndRemove(_id);

  // console.log("DELETE");
  res.json({ message: "Post deleted successfully!" });
});
