import multer from "multer";
import { v4 as randomString } from "uuid";
import path from "path";

const uploadFolderPath = "uploads";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadFolderPath);
  },
  filename: (req, file, callback) => {
    const fileName = randomString() + path.extname(file.originalname);
    console.log(fileName);

    callback(null, fileName);
  },
});

const upload = multer({
  storage: storage,
}).single("attachment");

export const uploadFile = (req, res, next) => {
  upload(req, res, () => {
    res.send({
      status: true,
      message: "File Upload API",
    });
  });
};
