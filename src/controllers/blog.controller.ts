import blogService from "@services/blog.services";
import asyncWrapper from "@utils/asyncWrapper";
import { returnResponse } from "@utils/returnResponse";


export const getBlogs = asyncWrapper(async (req, res) => {
  const page = req.query.page as string;
  const limit = req.query.limit as string;
  const pageNumber = parseInt(page) || 1;
  const pageLimit = parseInt(limit) || 10;
  const returns = await blogService.getBlogs(pageNumber, pageLimit);
  returnResponse(res, returns);
})

export const getBlogDetail = asyncWrapper(async (req, res) => {
  const returns = await blogService.getBlogDetail(req.params.slug as string);
  returnResponse(res, returns);
})

export const storeBlog = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const returns = await blogService.storeBlog(userId, req.body);
  returnResponse(res, returns);
})

export const updateBlog = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const returns = await blogService.updateBlog(userId, req.body);
  returnResponse(res, returns);
})

export const deleteBlog = asyncWrapper(async (req, res) => {
  const returns = await blogService.deleteBlog(parseInt(req.query.id as string));
  returnResponse(res, returns);
})