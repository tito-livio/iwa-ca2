/**
 * @author: Tito Livio - 2018253
 * @description: This file is responsible for distribution of the all the routes
 */

//import express and express-validator, bodyParser
import express from "express";
import { body, check } from "express-validator";
import bodyparser from "body-parser";
//importing some functions from the ../controller/controller.js file
import {
  createCar_API,
  findCar_API,
  updateCar_API,
  deleteCar_API,
} from "../controller/controller.js";
//importing some functions from the ../services/render.js file
import {
  index_app,
  add_car_app,
  createCar_app,
  edit_car_app,
  update_car_app,
  delete_car_app,
} from "../services/render.js";

//creating a instance of express
const route = express.Router();
/**
 * @description Endpoints for the webpage itself and API
 * _app ending for the functions is for the webpage from render and _API is for the API from controller
 */

//Route for the index page of application generate from ../services/render.js
route.get("/", index_app);

//Add a car html page generate from ../services/render.js using a GET
route.get("/add-car", add_car_app);
//Request for adding a car into database using a POST
route.post("/add-car", createCar_app);

//Edit a car html page from ../services/render.js
route.get("/edit-car", edit_car_app);

//Update a car html page from ../services/render.js
route.get("/update-car", update_car_app);

//Delete a car html page from ../services/render.js
route.get("/delete-car", delete_car_app);

/**
 * @description These are API routes endpoints
 * @methods GET/POST/PATCH/DELETE for /api/car
 */

//Create a car from ../controller/controller.js
route.post(
  "/api/car",
  [
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
  ],
  body("name").not().isEmpty().isString().trim().escape(),
  body("type").not().isEmpty().isString().trim().escape(),
  body("fuel").not().isEmpty().trim().escape().escape(),
  body("price").isNumeric(),
  createCar_API
);

//Find a car from ../controller/controller.js
route.get("/api/car/", findCar_API);

//Find a car by Id from ../controller/controller.js
route.get("/api/car/:id", findCar_API);

//Update a car from ../controller/controller.js
route.patch(
  "/api/update/:id",
  [
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
  ],
  body("name").not().isEmpty().isString().trim().escape(),
  body("type").not().isEmpty().isString().trim().escape(),
  body("fuel").not().isEmpty().trim().escape().escape(),
  body("price").isNumeric(),
  updateCar_API
);

//Delete a car from ../controller/controller.js
route.delete("/api/delete/:id", deleteCar_API);

//Making the router available to the system globally
export default route;
