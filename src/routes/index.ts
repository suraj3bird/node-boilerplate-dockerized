import express from "express";
import v1 from "./v1";
import upload from "./upload";
import path from "path";

const router = express.Router();
router.use(
  "/media",
  express.static(path.join(__dirname, "..", "..", "public"))
);
router.use("/v1", v1);
router.use("/upload", upload);

export default router;
