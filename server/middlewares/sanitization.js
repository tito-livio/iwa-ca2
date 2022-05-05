import { body } from "express-validator";

export const sanitize_name = body("name")
  .not()
  .isEmpty()
  .isString()
  .trim()
  .escape();

export const sanitize_fuel = body("fuel")
  .not()
  .isEmpty()
  .isString()
  .trim()
  .escape();

export const sanitize_type = body("type")
  .not()
  .isEmpty()
  .isString()
  .trim()
  .escape();

export const sanitize_price = body("price").isNumeric();
