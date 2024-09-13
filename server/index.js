import express from "express";
import router from "./router/fileRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const PORT = process.env.PORT || 8080;
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

mongoose
  .connect(`${process.env.DATABASE_URI}${process.env.DB_NAME}`)
  .then(() => console.log("Connected to database."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
