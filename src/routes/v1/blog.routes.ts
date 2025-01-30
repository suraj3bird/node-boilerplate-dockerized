import { Router } from "express";
import { hasRole, verifyToken } from "@middlewares/auth.middleware";
import { ADMIN_ROLE } from "@constants/role.constant";
import { validate } from "src/validators";
import { deleteBlog, getBlogDetail, getBlogs, storeBlog, updateBlog } from "@controllers/blog.controller";
import { blogValidator } from "src/validators/user";

const blogRouter = Router();

blogRouter.get('/', getBlogs);
blogRouter.get('/:slug', getBlogDetail);
blogRouter.use(verifyToken);
blogRouter.use(hasRole([ADMIN_ROLE]));
blogRouter.post('/add', blogValidator.register, validate, storeBlog);
blogRouter.patch('/update', blogValidator.update, validate, updateBlog);
blogRouter.delete('/delete', deleteBlog);

export default blogRouter;