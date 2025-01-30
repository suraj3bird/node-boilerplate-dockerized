import { Router } from "express";
import {
  login,
  logout,
  register,
  profile,
  users,
  updateProfile,
  requestPasswordChange,
  addUpdateAddress,
  deleteAddress,
  addUpdateGuardian,
  deleteGuardian,
  addUpdateEducation,
  deleteEducation,
  deleteUser
} from "@controllers/auth.controller";
import { hasRole, verifyToken } from "@middlewares/auth.middleware";
import authValidator from "src/validators/auth";
import { validate } from "src/validators";
import { ADMIN_ROLE } from "@constants/role.constant";
import { addressValidator, educationValidator, guardianValidator } from "src/validators/user";

const authRouter = Router();
authRouter.post("/login", authValidator.login, validate, login);
authRouter.get("/logout", logout);
authRouter.post("/register", authValidator.register, validate, register);
authRouter.post("/request-password-change", requestPasswordChange);

authRouter.use(verifyToken);
authRouter.get("/profile", profile);
authRouter.patch("/profile", updateProfile);
// user address details
authRouter.post("/profile/address", addressValidator.register, validate, addUpdateAddress);
authRouter.patch("/profile/address", addUpdateAddress);
authRouter.delete("/profile/address/delete", deleteAddress);
// student guardian details
authRouter.post("/profile/guardian", guardianValidator.register, validate, addUpdateGuardian);
authRouter.patch("/profile/guardian", guardianValidator.update, validate, addUpdateGuardian);
authRouter.delete("/profile/guardian/delete", deleteGuardian);
// student Education details
authRouter.post("/profile/education", educationValidator.register, validate, addUpdateEducation);
authRouter.patch("/profile/education", addUpdateEducation);
authRouter.delete("/profile/education/delete", deleteEducation);
// admin
authRouter.use(hasRole([ADMIN_ROLE]));
authRouter.get("/users", users);
authRouter.get("/user/profile/:userId", profile);
authRouter.patch("/profile/:userId", updateProfile);
authRouter.patch("/user/delete", deleteUser);

//Add Education details by admin
authRouter.post("/profile/education/:userId", educationValidator.register, validate, addUpdateEducation);
authRouter.patch("/profile/education/:userId", addUpdateEducation);
authRouter.delete("/profile/education/delete/:userId", deleteEducation);
// Add guardian details by admin
authRouter.post("/profile/guardian/:userId", guardianValidator.register, validate, addUpdateGuardian);
authRouter.patch("/profile/guardian/:userId", guardianValidator.update, validate, addUpdateGuardian);
authRouter.delete("/profile/guardian/delete/:userId", deleteGuardian);
// Add address details by admin
authRouter.post("/profile/address/:userId", addressValidator.register, validate, addUpdateAddress);
authRouter.patch("/profile/address/:userId", addUpdateAddress);
authRouter.delete("/profile/address/delete/:userId", deleteAddress);

export default authRouter;
