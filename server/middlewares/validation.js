/**
 * @author: Tito Livio - 2018253
 * @description: This file is responsible for validations of the client input
 */

//import check from "express-validator";
import { check } from "express-validator";

//calling the instance of the validator function
export const validate = [
  //checking item by item which is necessary for the validation
  check("name", "name must be greater than 5 characters")
    .exists()
    .isAlphanumeric("en-US", { ignore: " " })
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
