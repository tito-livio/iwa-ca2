import { check } from "express-validator";

export const validate = [
  check("name", "name must be greater than 5 characters")
    .exists()
    .isAlphanumeric()
    .isLength({
      min: 5,
    }),
  check("type", "type must be greater than 5 characters")
    .exists()
    .isAlphanumeric()
    .isLength({
      min: 5,
    }),
  check("fuel", "fuel must be greater than 5 characters")
    .exists()
    .isAlphanumeric()
    .isLength({
      min: 5,
    }),
];
