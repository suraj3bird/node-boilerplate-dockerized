import { body } from "express-validator";

const authValidator = {
  register: [
    body("firstName")
      .exists()
      .not()
      .isEmpty()
      .withMessage("First Name is required.")
      .isString()
      .isLength({ max: 20, min: 2 })
      .withMessage("Name has length min-2 and max-20 characters."),
    body("lastName")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Last Name is required.")
      .isString()
      .isLength({ max: 20, min: 2 })
      .withMessage("Name has length min-2 and max-20 characters."),
    body("email")
      .isEmail()
      .withMessage("Email must be a valid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password is minimum 8 chars long."),
  ],
  login: [
    body("email")
      .isEmail()
      .withMessage("Email must be a valid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password is minimum 8 chars long."),
  ],
};

export default authValidator;
