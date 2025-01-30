import ebookService from "@services/ebook.services";
import asyncWrapper from "@utils/asyncWrapper";
import { returnResponse } from "@utils/returnResponse";

export const getEbooks = asyncWrapper(async (req, res) => {
  const page = req.query.page as string;
  const limit = req.query.limit as string;
  const pageNumber = parseInt(page) || 1;
  const pageLimit = parseInt(limit) || 10;
    
  const returns = await ebookService.getEbooks(pageNumber, pageLimit);
  returnResponse(res, returns);
})

export const getEbookDetail = asyncWrapper(async (req, res) => {
  const returns = await ebookService.getEbookDetail(req.params.slug as string);
  returnResponse(res, returns);
})

export const storeEbook = asyncWrapper(async (req, res) => {
  const returns = await ebookService.storeEbook(req.body);
  returnResponse(res, returns);
})

export const updateEbook = asyncWrapper(async (req, res) => {
  const returns = await ebookService.updateEbook(req.body);
  returnResponse(res, returns);
})

export const deleteEbook = asyncWrapper(async (req, res) => {
  const returns = await ebookService.deleteEbook(parseInt(req.query.id as string));
  returnResponse(res, returns);
})