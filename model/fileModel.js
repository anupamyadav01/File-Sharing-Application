import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  newName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
});

export const fileModel = mongoose.model("files", fileSchema);
