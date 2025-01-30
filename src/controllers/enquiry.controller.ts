import enquiryService from "@services/enquiry.services";
import asyncWrapper from "@utils/asyncWrapper";
import { returnResponse } from "@utils/returnResponse";

export const getEnquirys = asyncWrapper(async (req, res) => {
  const page = req.query.page as string;
  const limit = req.query.limit as string;
  const pageNumber = parseInt(page) || 1;
  const pageLimit = parseInt(limit) || 10;
    
  const returns = await enquiryService.getEnquirys(pageNumber, pageLimit);
  returnResponse(res, returns);
})

export const getEnquiryDetail = asyncWrapper(async (req, res) => {
  const returns = await enquiryService.getEnquiryDetail(parseInt(req.params.id as string));
  returnResponse(res, returns);
})

export const storeEnquiry = asyncWrapper(async (req, res) => {
  const returns = await enquiryService.storeEnquiry(req.body);
  returnResponse(res, returns);
})

export const deleteEnquiry = asyncWrapper(async (req, res) => {
  const returns = await enquiryService.deleteEnquiry(parseInt(req.query.id as string));
  returnResponse(res, returns);
})