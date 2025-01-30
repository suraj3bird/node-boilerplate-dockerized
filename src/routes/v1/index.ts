import { Router } from "express";
import authRouter from "./auth.routes";
import ebooksRouter from "./ebooks.routes";
import blogRouter from "./blog.routes";
import destinationRouter from "./destination.routes";
import enquiryRouter from "./enquiry.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/ebooks", ebooksRouter);
router.use("/destination", destinationRouter);
router.use("/enquiry", enquiryRouter);
router.use("/blog", blogRouter);
export default router;
