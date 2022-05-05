/**
 * @author: Tito Livio - 2018253
 * @description: This file is responsible for sanitization of the client input
 */

//import body from express-validator;
import { body } from "express-validator";
//sanitation item by item which is necessary for the validation
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