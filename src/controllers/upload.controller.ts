import asyncWrapper from "@utils/asyncWrapper";
import { returnResponse } from "@utils/returnResponse";
import mediaService from "@services/media.services";

export const uploadImage = asyncWrapper(async (req, res) => {
  if (!req.file) throw new Error("Error uploading image");
  let file: Express.Multer.File = req.file as Express.Multer.File;
  const targetFile = (req.query.target as string) || "images";
  const filePath = `uploads/${targetFile}/${file.filename}`;
  res.status(201).json({
    path: filePath
  });
});

export const removeFile = asyncWrapper(async (req, res) => {
  const path = req.query.path as string;
  const returns = await mediaService.deleteMedia(path);
  returnResponse(res, returns);
});
