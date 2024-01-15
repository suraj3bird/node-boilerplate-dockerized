import { verifyAccessToken, IDecodedToken } from "@utils/jwt";
import { tokenError } from "@constants/auth.constant";
import asyncWrapper from "@utils/asyncWrapper";
// import { IRole } from "@interfaces/role";
import { returnResponse } from "@utils/returnResponse";
import { prisma } from "@prisma/prisma";

export const verifyToken = asyncWrapper(async (req, res, next) => {
  const { authorization } = req.headers;
  const accessToken = authorization?.split("Bearer ")[1];
  if (!accessToken)
    return returnResponse(res, {
      ok: false,
      status: tokenError.invalid.status,
      message: tokenError.invalid.msg
    });

  const decoded = (await verifyAccessToken(accessToken)) as IDecodedToken;

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });

  if (!user)
    return returnResponse(res, {
      ok: false,
      status: tokenError.notFound.status,
      message: tokenError.notFound.msg
    });
  req.user = user;
  next();
});

// export const hasRole = (roles: IRole[]) => {
//   return asyncWrapper(async (req, res, next) => {
//     const { role } = req.user;
//     if (!roles.includes(role)) {
//       return returnResponse(res, {
//         ok: false,
//         status: 401,
//         message: `User don't have enought permission`
//       });
//     }
//     next();
//   });
// };
