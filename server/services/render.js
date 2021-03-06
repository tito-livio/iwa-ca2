/**
 * @author: Tito Livio - 2018253
 * @description: This file is responsible for to render of all webpages of the system.
 */

//import axios module for making http requests
import axios from "axios";
//importing database connection
import Cardb from "../model/model.js";
//importing SERVER and PORT
import { SERVER } from "../../server.js";
//Importing express validation
import { validationResult } from "express-validator";

//Render the main homepage of the application
export const index_app = (req, res) => {
  axios
    .get(`${SERVER}/api/car`)
    .then((response) => {
      //rendering the index.ejs file with the data from the api with car data as an object
      res.render("index", { car: response.data });
    })
    .catch((error) => {
      res.send(error);
    });
};

//Render the Edit car webpage with the data of the car
export const edit_car_app = (req, res) => {
  //making a get request to /api/car
  axios
    .get(`${SERVER}/api/car`)
    .then((response) => {
      //rendering the edit_car.ejs file with the data from the api with car data as an object
      res.render("edit_car", { car: response.data });
    })
    .catch((error) => {
      res.send(error);
    });
};

//Render the Add car webpage
export const add_car_app = (req, res) => {
  //rendering the add_car.ejs file
  res.render("add_car");
};

//Render the Create car webpage
export const createCar_app = (req, res) => {
  //Validate request
  const errors = validationResult(req);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  if (!errors.isEmpty()) {
    res.render("add_car", {
      errors,
    });
    return;
  }
  //Getting the data from the body request into a variable
  const car = new Cardb({
    name: req.body.name,
    type: req.body.type,
    fuel: req.body.fuel,
    price: req.body.price,
    ecoType: req.body.ecoType,
  });
  //save car into database
  car
    .save(car)
    .then((data) => {
      res.redirect("/add-car");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the car.",
      });
    });
};

//Render the Update car webpage
export const update_car_app = (req, res) => {
  //Requesting the data from the database by the id
  let id = req.query.id;
  axios
    .get(`${SERVER}/api/car/${id}`)
    .then((response) => {
      //rendering the update_car.ejs file with the data from the api with car data as an object
      res.render("update_car", { car: response.data });
    })
    .catch((error) => {
      res.send("Car was not found!!");
    });
};

//Render the delete car webpage
export const delete_car_app = (req, res) => {};
