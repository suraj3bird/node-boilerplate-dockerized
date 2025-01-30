// import { verifyAccessToken, IDecodedToken } from "@utils/jwt";
import { tokenError } from "@constants/auth.constant";
import asyncWrapper from "@utils/asyncWrapper";
import { IRole } from "@interfaces/role";
import { returnResponse } from "@utils/returnResponse";
import { prisma } from "@prisma/prisma";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import config from "@config/index";

const client = jwksClient({
  jwksUri: `${config.app.auth0.issuerBaseUrl}/.well-known/jwks.json` // Replace with your Auth0 domain
});

const getKey = (header: any, callback: any) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err, null);
    } else {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    }
  });
};

export const verifyToken = asyncWrapper(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken)
    return returnResponse(res, {
      ok: false,
      status: tokenError.invalid.status,
      message: tokenError.invalid.msg
    });

  // const decoded = (await verifyAccessToken(accessToken)) as IDecodedToken;

  jwt.verify(
    accessToken,
    getKey,
    {
      algorithms: ["RS256"], // Auth0 uses RS256 by default
      audience: config.app.auth0.apiIdentifier, // Set your API identifier here
      issuer: `${config.app.auth0.issuerBaseUrl}/` // Replace with your Auth0 domain
    },
    async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Token is invalid" });
      }
      const { sub: auth0 } = decoded;
      const userId = auth0.toString().split("|")[1];
      const user = await prisma.user.findUnique({ where: { uuId: userId } });
      if (!user)
        return returnResponse(res, {
          ok: false,
          status: tokenError.notFound.status,
          message: tokenError.notFound.msg
        });
      req.user = user;
      next();
    }
  );
});

export const hasRole = (roles: IRole[]) => {
  return asyncWrapper(async (req, res, next) => {
    const { role }: any = req.user;
    if (!roles.includes(role)) {
      return returnResponse(res, {
        ok: false,
        status: 401,
        message: `User don't have enough permission`
      });
    }
    next();
  });
};