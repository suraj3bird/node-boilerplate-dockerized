import { Router } from "express";
import { hasRole, verifyToken } from "@middlewares/auth.middleware";
import { ADMIN_ROLE } from "@constants/role.constant";
import { destinationValidator } from "src/validators/user";
import { validate } from "src/validators";
import { deleteDestination, getDestinationDetail, getDestinations, storeDestination, updateDestination } from "@controllers/destination.controller";

const destinationRouter = Router();

destinationRouter.get('/', getDestinations);
destinationRouter.get('/:slug', getDestinationDetail);
destinationRouter.use(verifyToken);
destinationRouter.use(hasRole([ADMIN_ROLE]));
destinationRouter.post('/add', destinationValidator.register, validate, storeDestination);
destinationRouter.patch('/update', destinationValidator.update, validate, updateDestination);
destinationRouter.delete('/delete', deleteDestination);
export default destinationRouter;