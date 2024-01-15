import asyncWrapper from "@utils/asyncWrapper";
import userAuthservice from "@services/auth.services";
import { returnResponse } from "@utils/returnResponse";

export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const returns = await userAuthservice.login(email, password);
  returnResponse(res, returns);
});

export const register = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const returns = await userAuthservice.register(firstName, lastName, email, password);
  returnResponse(res, returns);
});

export const users = asyncWrapper(async (req, res) => {
  const page = req.query.page as string;
  const limit = req.query.limit as string;
  const pageNumber = parseInt(page) || 1;
  const pageLimit = parseInt(limit) || 10;
  const returns = await userAuthservice.users(pageNumber, pageLimit);
  returnResponse(res, returns);
});

export const profile = asyncWrapper(async (req, res) => {
  const returns = await userAuthservice.profile(req.user.id);
  returnResponse(res, returns);
});

export const updateProfile = asyncWrapper(async (req, res) => {
  const user = req.user;
  const { firstName, lastName, avatar } = req.body;
  const returns = await userAuthservice.updateProfile(user.id, firstName, lastName, avatar);
  returnResponse(res, returns);
});

export const credManager = asyncWrapper(async (req, res) => {
  const user = req.user;
  const { oldPassword, newPassword } = req.body;
  const returns = await userAuthservice.updateCredential(
    user.id,
    oldPassword,
    newPassword
  );
  returnResponse(res, returns);
});

export const forgotPasswordRequest = asyncWrapper(async (req, res) => {
  const email = req.body.email as string;
  const returns = await userAuthservice.requestForgotPassword(email);
  returnResponse(res, returns);
});

export const forgotPasswordTokenRequest = asyncWrapper(async (req, res) => {
  const { key, code } = req.body;
  const returns = await userAuthservice.requestTokenForPasswordChanges(
    key,
    code
  );
  returnResponse(res, returns);
});

export const changeForgotPassword = asyncWrapper(async (req, res) => {
  const { token, newPassword } = req.body;
  const returns = await userAuthservice.changePasswordFromToken(
    token,
    newPassword
  );
  returnResponse(res, returns);
});
