import express from "express";
import router from "./router/fileRouter.js"; // Ensure correct import
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000; // Use environment variable or default to 8080
const app = express();

// Middleware
app.use(express.json());

mongoose
  .connect(`${process.env.DATABASE_URI}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use router
// Use router
app.use("/", router);

console.log("after router");

// Start server
app
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Server is running at http://localhost:${PORT}`);
  })
  .on("error", (error) => {
    console.error("Error starting server:", error);
  });
