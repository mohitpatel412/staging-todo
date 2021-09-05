import mongoose from "mongoose";

const postTodo = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    creator: {
      type: String,
    },
    description: {
      type: String,
    },
    fontSize: {
      type: Number,
    },
    selectedFile: {
      type: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", postTodo);

export default Todo;
