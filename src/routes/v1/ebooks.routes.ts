import { deleteEbook, getEbookDetail, getEbooks, storeEbook, updateEbook } from "@controllers/ebook.controller";
import { Router } from "express";
import { hasRole, verifyToken } from "@middlewares/auth.middleware";
import { ADMIN_ROLE } from "@constants/role.constant";
import { ebookValidator } from "src/validators/user";
import { validate } from "src/validators";

const ebooksRouter = Router();

ebooksRouter.get('/', getEbooks);
ebooksRouter.get('/:slug', getEbookDetail);
ebooksRouter.use(verifyToken);
ebooksRouter.use(hasRole([ADMIN_ROLE]));
ebooksRouter.post('/add', ebookValidator.register, validate, storeEbook);
ebooksRouter.patch('/update', ebookValidator.update, validate, updateEbook);
ebooksRouter.delete('/delete', deleteEbook);
export default ebooksRouter;