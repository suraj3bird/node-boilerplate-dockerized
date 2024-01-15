import { uploadImage, removeFile } from "@controllers/upload.controller";
import validateImage from "@middlewares/upload.middleware";
import { verifyToken } from "@middlewares/auth.middleware";
// import { ADMIN_ROLE } from "@constants/role.constant";
import { Router } from "express";

const uploadRouter = Router();

uploadRouter.use(verifyToken);
// uploadRouter.use(hasRole([ADMIN_ROLE]));
uploadRouter.post("/", validateImage.single("image"), uploadImage);
uploadRouter.delete("/remove", removeFile);

export default uploadRouter;
