import { body } from "express-validator";
import { idCheck, registerAddress, registerBlog, registerDestination, registerEbook, registerEducation, registerEnquiry, registerGuardian, registerUser, slugCheck } from "./registers";

// user validator
export const userValidator = {
  register: registerUser
}

// address validator
export const addressValidator = {
  register: registerAddress,
  update: [
    ...idCheck,
    ...registerAddress
  ],
}

// guardian validator
export const guardianValidator = {
  register: registerGuardian,
  update: [
    ...idCheck,
    ...registerGuardian
  ]
}

// education validator
export const educationValidator = {
  register: registerEducation,
  update: [
    ...idCheck,
    ...registerEducation
  ]
}

// enquiry validator
export const enquiryValidator = {
  register: registerEnquiry,
  update: [
    ...idCheck,
    body("enquiryId")
      .exists()
      .not()
      .isEmpty()
      .withMessage("EnquiryId is required.")
      .isString()
      .withMessage("EnquiryId must be a string"),
    ...registerEnquiry
  ]
}

// ebook Vaidator
export const ebookValidator = {
  register: registerEbook,
  update: [
    ...idCheck,
    ...slugCheck,
    ...registerEbook
  ]
}

// destination validator
export const destinationValidator = {
  register: registerDestination,
  update: [
    ...idCheck,
    ...slugCheck,
    ...registerDestination
  ]
}

// blog validator
export const blogValidator = {
  register: registerBlog,
  update: [
    ...idCheck,
    ...slugCheck,
    ...registerBlog
  ]
}