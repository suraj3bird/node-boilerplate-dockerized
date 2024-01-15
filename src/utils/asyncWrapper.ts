import { Request, Response, NextFunction, RequestHandler } from "express";
import { IUser } from "@interfaces/user";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

function asyncWrapper(fn: AsyncRequestHandler): RequestHandler {
  try {
    return (req: Request, res: Response, next: NextFunction): void => {
      fn(req, res, next).catch(err => {
        switch (err?.name) {
          case "ValidationError":
            res.status(400).json({
              ok: false,
              error: true,
              message: err?.message || "something went wrong",
              stack: err?.stack
            });
            break;
          case "user":
            res.status(401).json({
              ok: false,
              error: true,
              message: err?.message || "Something went wrong",
              stack: err?.stack
            });
            break;
          case "JsonWebTokenError":
            res.status(401).json({
              ok: false,
              error: true,
              message: "Session expired, Please login again",
              stack: err?.stack
            });
            break;
          case "TokenExpiredError":
            res.status(401).json({
              ok: false,
              error: true,
              message: "Session expired, Please login again",
              stack: err?.stack
            });
            break;
          default:
            res.status(400).json({
              ok: false,
              error: true,
              message: err?.message || "something went wrong",
              stack: err?.stack
            });
            break;
        }
      });
    };
  } catch (error) {
    next(error)
  }
}

export default asyncWrapper;
function next(error: any) {
  console.log(error);
  throw new Error("Function not implemented.");
}

