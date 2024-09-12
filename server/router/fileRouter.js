import express, { Router } from "express";
import {
  downloadFile,
  generateShareableLink,
  sendMail,
  uploadFile,
} from "../controller/fileController.js";

const rotuer = express.Router();

rotuer.post("/api/upload-file", uploadFile);

rotuer.get("/file/:fileID", generateShareableLink);

rotuer.get("/files/download/:fileID", downloadFile);

rotuer.post("/api/files/send", sendMail);
export default rotuer;
