import multer from "multer";
import { v4 as randomString } from "uuid";
import path from "path";
import { fileModel } from "../model/fileModel.js";

const uploadFolderPath = "uploads";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadFolderPath);
  },
  filename: (req, file, callback) => {
    const fileName = randomString() + path.extname(file.originalname);
    // console.log(fileName);

    callback(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024,
  },
}).single("attachment");

export const uploadFile = (req, res, next) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(error.message);
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
    console.log(req.file);

    const { originalname, filename, size } = req.file;
    console.log(originalname, filename, size);

    const dataToUpload = {
      originalName: originalname,
      newName: filename,
      fileSize: size,
    };

    await fileModel.create(dataToUpload);
    res.send({
      status: true,
      message: "File Upload API",
    });
  });
};
