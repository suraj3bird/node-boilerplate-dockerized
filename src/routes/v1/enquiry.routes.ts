import { Router } from "express";
import { hasRole, verifyToken } from "@middlewares/auth.middleware";
import { ADMIN_ROLE } from "@constants/role.constant";
import { enquiryValidator } from "src/validators/user";
import { validate } from "src/validators";
import { deleteEnquiry, getEnquiryDetail, getEnquirys, storeEnquiry } from "@controllers/enquiry.controller";

const enquiryRouter = Router();

enquiryRouter.post('/add', enquiryValidator.register, validate, storeEnquiry);
enquiryRouter.use(verifyToken);
enquiryRouter.use(hasRole([ADMIN_ROLE]));
enquiryRouter.get('/', getEnquirys);
enquiryRouter.get('/:id', getEnquiryDetail);
enquiryRouter.delete('/delete', deleteEnquiry);
export default enquiryRouter;