import { Request, NextFunction, Response } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  // console.log(errors);
  if (errors.isEmpty()) {
    next();
    return;
  }
  const message = errors.array().map((error) => error.msg).filter((msg) => msg != "Invalid value");
  res.status(422).send({
    ok: false,
    error: true,
    message: message.join(" & "),
  });
}