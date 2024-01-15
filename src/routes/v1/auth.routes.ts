import { Router } from "express";
import {
  login,
  register,
  profile,
  users,
  updateProfile,
  credManager,
  forgotPasswordRequest,
  forgotPasswordTokenRequest,
  changeForgotPassword
} from "@controllers/auth.controller";
import { verifyToken } from "@middlewares/auth.middleware";
import authValidator from "src/validators/auth";
import { validate } from "src/validators";
// import { ADMIN_ROLE } from "@constants/role.constant";

const authRouter = Router();

authRouter.post("/login", authValidator.login, validate, login);
authRouter.post("/register", authValidator.register, validate, register);

authRouter.post("/forgot-password", forgotPasswordRequest);
authRouter.post("/forgot-password/token", forgotPasswordTokenRequest);
authRouter.post("/forgot-password/change", changeForgotPassword);

authRouter.use(verifyToken);
// authRouter.use(hasRole([ADMIN_ROLE]));
authRouter.get("/users", users);
authRouter.get("/profile", profile);
authRouter.patch("/profile", updateProfile);
authRouter.patch("/profile/update-cred", credManager);

export default authRouter;
