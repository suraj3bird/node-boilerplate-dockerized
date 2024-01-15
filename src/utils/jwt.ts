import jwt, { verify } from "jsonwebtoken";
import config from "@config/index";
import { IUser } from "@models/user.model";

export interface IDecodedToken {
  id: number;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  aud: string;
}

export const genAccessToken = (user: IUser["id"]) => {
  return new Promise((resolve, reject) => {
    try {
      const accessToken = jwt.sign({ id: user }, config.jwt.secretAccess, {
        expiresIn: config.jwt.token_access_ttl,
        issuer: config.jwt.issuer,
        audience: user.toString()
      });
      resolve(accessToken);
    } catch (err) {
      reject(err);
    }
  });
};

export const verifyAccessToken = (token: string) => {
  return new Promise((resolve, reject) => {
    try {
      const decodedToken = verify(token, config.jwt.secretAccess, {
        issuer: config.jwt.issuer
      }) as IDecodedToken;
      resolve(decodedToken);
    } catch (err) {
      reject(err);
    }
  });
};
