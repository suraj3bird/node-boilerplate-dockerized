import destinationService from "@services/destination.services";
import asyncWrapper from "@utils/asyncWrapper";
import { returnResponse } from "@utils/returnResponse";

export const getDestinations = asyncWrapper(async (req, res) => {
  const page = req.query.page as string;
  const limit = req.query.limit as string;
  const pageNumber = parseInt(page) || 1;
  const pageLimit = parseInt(limit) || 10;
    
  const returns = await destinationService.getDestinations(pageNumber, pageLimit);
  returnResponse(res, returns);
})

export const getDestinationDetail = asyncWrapper(async (req, res) => {
  const returns = await destinationService.getDestinationDetail(req.params.slug as string);
  returnResponse(res, returns);
})

export const storeDestination = asyncWrapper(async (req, res) => {
  const returns = await destinationService.storeDestination(req.body);
  returnResponse(res, returns);
})

export const updateDestination = asyncWrapper(async (req, res) => {
  const returns = await destinationService.updateDestination(req.body);
  returnResponse(res, returns);
})

export const deleteDestination = asyncWrapper(async (req, res) => {
  const returns = await destinationService.deleteDestination(parseInt(req.query.id as string));
  returnResponse(res, returns);
})