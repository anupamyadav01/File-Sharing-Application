import express from "express";
import { uploadFile } from "../controller/fileController.js";

const rotuer = express.Router();

rotuer.post("/api/upload-file", uploadFile);

export default rotuer;
