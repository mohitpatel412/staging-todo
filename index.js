import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRouter from "./routes/post.js";
import userRouter from "./controllers/userRouter.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const port = process.env.PORT || 4444;

mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.set("useFindAndModify", false);

app.use("/api", userRouter);
app.use("/todos", todoRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use("/", (req, res) => {
  res.send("Server is Ready!!");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
