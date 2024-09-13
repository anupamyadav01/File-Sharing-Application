import multer from "multer";
import { v4 as randomString } from "uuid";
import path from "path";

const uploadFolderPath = "uploads/";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadFolderPath);
  },
  filename: (req, file, callback) => {
    const fileName = randomString() + path.extname(file.originalname);
    callback(null, fileName);
  },
});

export const uploadPhoto = multer({
  storage: storage,
});
