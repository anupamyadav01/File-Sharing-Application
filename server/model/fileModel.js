import mongoose from "mongoose";

// const fileSchema = new mongoose.Schema({
//   originalName: {
//     type: String,
//     required: true,
//   },
//   newName: {
//     type: String,
//     required: true,
//   },
//   fileSize: {
//     type: Number,
//     required: true,
//   },
// });
// export const fileModel = mongoose.model("userfiles", fileSchema);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

export const userModel = mongoose.model("userDetails", userSchema);
