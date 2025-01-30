import { body } from "express-validator";

export const registerUser = [
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
  body("username")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("must have length min-2 and max-20 characters."),
  body("phone")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Phone is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("must have length min-2 and max-20 characters."),
  body("status")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Status is required.")
    .isString(),
  body("role")
    .isString(),
  body("occupation")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("must have length min-2 and max-20 characters."),
  body("dob")
    .isString(),
  body("avatar")
    .isString(),
];

export const registerAddress = [
  body("country")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Country is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("Country must have length min-2 and max-20 characters."),
  body("state")
    .exists()
    .not()
    .isEmpty()
    .withMessage("State is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("State must have length min-2 and max-20 characters."),
  body("city")
    .exists()
    .not()
    .isEmpty()
    .withMessage("City is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("City must have length min-2 and max-20 characters."),
  body("district")
    .exists()
    .not()
    .isEmpty()
    .withMessage("District is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("District must have length min-2 and max-20 characters."),
  body("street")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Street is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("Street must have length min-2 and max-20 characters."),
  body("addressType")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Address Type is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("Address Type must have length min-2 and max-20 characters."),
]

export const registerGuardian = [
  body("fullName")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Full Name is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("Full Name must have length min-2 and max-20 characters."),
  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Email must be a valid email")
    .normalizeEmail(),
  body("phone")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Phone is required.")
    .isString()
    .isLength({ max: 14, min: 8 })
    .withMessage("Phone No must have length min-8 and max-14 characters."),
  body("relation")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Relation is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("Relation must have length min-2 and max-20 characters.")
]

export const registerEducation = [
  body("university")
    .exists()
    .not()
    .isEmpty()
    .withMessage("University is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("University must have length min-2 and max-20 characters."),
  body("degree")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Degree is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("Degree must have length min-2 and max-20 characters."),
  body("startDate")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Start Date is required.")
    .isString(),
  body("endDate")
    .isString()
    .optional({ checkFalsy: true }),
]

export const registerEnquiry = [
  body("fullName")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Full Name is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("must have length min-2 and max-20 characters."),
  body("email")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email must be a valid email")
    .normalizeEmail(),
  body("phone")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Phone is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("must have length min-2 and max-20 characters."),
  body("subject")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Subject is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("must have length min-2 and max-20 characters."),
  body("intake")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("must have length min-2 and max-20 characters.")
    .optional({ nullable: true}),
  body("studyLevel")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("must have length min-2 and max-20 characters.")
    .optional({ nullable: true}),
  body("destinationId")
    .isNumeric()
    .optional({ nullable: true})
]

export const registerEbook = [
  body("name")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Name is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("Name must have length min-2 and max-20 characters."),
  body("price")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Price is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("Price must have length min-2 and max-20 characters."),
  body("description")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Description is required.")
    .isString(),
  body("image")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Image is required.")
    .isString()
]

export const registerDestination = [
  body("title")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Name is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("Name must have length min-2 and max-20 characters."),
  body("image")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Image is required.")
    .isString(),
  body("description")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Description is required.")
    .isString(),
]

export const registerBlog = [
  body("title")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Name is required.")
    .isString()
    .isLength({ max: 20, min: 2 })
    .withMessage("Name must have length min-2 and max-20 characters."),
  body("image")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Image is required.")
    .isString(),
  body("excerpt")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Excerpt is required.")
    .isString(),
   body("category")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Category is required.")
    .isString(),
  body("description")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Description is required.")
    .isString(),
  body("userId")
    .exists()
    .not()
    .isEmpty()
    .withMessage("User Id is required.")
    .isNumeric()
    .withMessage("User Id must be a number"),
]

export const idCheck = [
  body("id")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Id is required.")
    .isNumeric()
    .withMessage("Id must be a number")
]

export const slugCheck = [
  body("slug")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Slug is required.")
    .isString()
]