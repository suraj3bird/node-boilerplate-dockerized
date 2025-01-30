import asyncWrapper from "@utils/asyncWrapper";
import userAuthservice from "@services/auth.services";
import { returnResponse } from "@utils/returnResponse";
import { getAuth0MgmntToken } from "@helpers/auth";
import config from "@config/index";
import queryString from "querystring";

export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const returns = await userAuthservice.login(email, password);
  res.cookie("accessToken", returns?.data?.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "lax"
  });
  res.cookie("refreshToken", returns?.data?.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "lax"
  });
  res.cookie("idToken", returns?.data?.idToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });
  returnResponse(res, {
    ok: returns?.ok,
    status: returns?.status,
    message: returns?.message
  });
});

export const logout = asyncWrapper(async (req, res) => {
  await getAuth0MgmntToken();
  const logoutUrl = `${config.app.auth0.issuerBaseUrl}/logout?${queryString.stringify({
      client_id: config.app.auth0.clientId,
      returnTo: config.app.auth0.logoutUrl
    })}`
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("idToken");
  res.redirect(logoutUrl);
})

export const register = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  const returns = await userAuthservice.register(
    firstName,
    lastName,
    email,
    phone,
    password
  );
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
  const returns = await userAuthservice.profile(req?.params?.userId ? parseInt(req.params.userId) : req.user.id);
  returnResponse(res, returns);
});

export const updateProfile = asyncWrapper(async (req, res) => {
  const user = req?.params?.userId ? parseInt(req.params.userId) : req.user.id;
  const returns = await userAuthservice.updateProfile(user, req.body);
  returnResponse(res, returns);
});

export const deleteUser = asyncWrapper(async (req, res) => {
  const user = parseInt(req.query.id as string);
  const returns = await userAuthservice.deleteUser(user);
  returnResponse(res, returns);
})

export const requestPasswordChange = asyncWrapper(async (req, res) => {
  const email = req.user.email;
  const returns = await userAuthservice.requestPasswordChange(email);
  returnResponse(res, returns);
});

export const addUpdateAddress = asyncWrapper(async (req, res) => {
  const user: number = req?.params?.userId ? parseInt(req.params.userId) : req.user.id;
  const addressData = req.body;
  const returns = await userAuthservice.addUpdateAddressDetails(user, addressData);
  returnResponse(res, returns);
})

export const deleteAddress = asyncWrapper(async (req, res) => {
  const user: number = req?.params?.userId ? parseInt(req.params.userId) : req.user.id;
  const addressId = req.query.id.toString();
  const returns = await userAuthservice.deleteAddress(user, parseInt(addressId));
  returnResponse(res, returns);
})

export const addUpdateGuardian = asyncWrapper(async (req, res) => {
  const user: number = req?.params?.userId ? parseInt(req.params.userId) : req.user.id;
  const guardianData = req.body;
  const returns = await userAuthservice.addUpdateGuardianDetails(user, guardianData);
  returnResponse(res, returns);
})

export const deleteGuardian = asyncWrapper(async (req, res) => {
  const user: number = req?.params?.userId ? parseInt(req.params.userId) : req.user.id;
  const guardianId = req.query.id.toString();
  const returns = await userAuthservice.deleteGuardian(user, parseInt(guardianId));
  returnResponse(res, returns);
})

export const addUpdateEducation = asyncWrapper(async (req, res) => {
  const user: number = req?.params?.userId ? parseInt(req.params.userId) : req.user.id;
  const educationData = req.body;
  const returns = await userAuthservice.addUpdateEducationDetails(user, educationData);
  returnResponse(res, returns);
})

export const deleteEducation = asyncWrapper(async (req, res) => {
  const user: number = req?.params?.userId ? parseInt(req.params.userId) : req.user.id;
  const educationId = req.query.id.toString();
  const returns = await userAuthservice.deleteEducation(user, parseInt(educationId));
  returnResponse(res, returns);
})