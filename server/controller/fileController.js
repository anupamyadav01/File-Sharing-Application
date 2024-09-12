import multer from "multer";
import { v4 as randomString } from "uuid";
import path from "path";
import { fileModel } from "../model/fileModel.js";
// dotenv.config();
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anupamy571@gmail.com",
    pass: "lgzgvspopsokwkjs",
  },
});

console.log(process.env.MY_PASSWORD);
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
    fileSize: 1024 * 1024 * 4,
  },
}).single("attachment");

export const uploadFile = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(error.message);
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
    // console.log(req.file);

    const { originalname, filename, size } = req.file;
    console.log(originalname, filename, size);

    const dataToUpload = {
      originalName: originalname,
      newName: filename,
      fileSize: size,
    };

    const uploadedData = await fileModel.create(dataToUpload);
    // console.log(uploadedData);

    res.send({
      status: true,
      message: "File Upload API",
      fileID: uploadedData._id,
    });
  });
};

export const generateShareableLink = async (req, res) => {
  const sharableLink = `/files/download/${req.params.fileID}`;
  res.json({
    status: true,
    message: "Shareable Link API",
    link: sharableLink,
  });
};

export const downloadFile = async (req, res) => {
  const fileID = req.params.fileID;
  console.log(fileID);
  const fileData = await fileModel.findById(fileID);
  console.log(fileData);

  const filePath = path.join(uploadFolderPath, fileData.newName);
  res.download(filePath, fileData.originalName, (error) => {
    if (error) console.log("error downloading file", error);
  });
};

export const sendMail = async (req, res) => {
  const fileID = req.body.fileID;

  const sharableLink = `${process.env.BASE_URL}/files/download/${fileID}`;
  const mailData = {
    from: process.env.MY_EMAIL,
    to: req.body.email,
    subject: "File Sharing",
    html: `
          <p>We’re excited for you to join us on MongoDB Atlas, the multi-cloud developer data platform for all kinds of use cases like vector search, stream processing, operational, transactional, and analytical workloads, and more. Need ideas on how to get started? Check out some resources below.
          </p>
          <a href=${sharableLink}>Click here.</a>
    `,
  };
  const fileData = await fileModel.findById(fileID);
  transporter.sendMail(mailData, fileData.originalName, (error, info) => {
    if (error) {
      return res.json({
        status: false,
        message: "Unable to send mail",
        error: error,
      });
    }
    // console.log("Email sent: ", info);
    res.json({
      status: true,
      message: "Email sent successfully",
    });
  });
};
