/**
 * @author: Tito Livio - 2018253
 * @description: This file is responsible for API request functions.
 */

//importing the database from models
import Cardb from "../model/model.js";
import { validationResult } from "express-validator";

//Create a new Car function
export const createCar_API = (req, res) => {
  console.log(req.body);
  //Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  //Save the request body into a variable
  const car = new Cardb({
    name: req.body.name,
    type: req.body.type,
    fuel: req.body.fuel,
    price: req.body.price,
    ecoType: req.body.ecoType,
  });
  //save car into database and return to the client
  car
    .save(car)
    .then((data) => {
      res.redirect("/api/car");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the car.",
        error: validationResult(req).array(),
      });
    });
};

//Find car by id function
export const findCar_API = (req, res) => {
  //Validate request if it is not empty
  if (req.params.id) {
    const id = req.params.id;
    //finding the car by id in the MongoDB database
    Cardb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: "Car not found with id: " + id,
          });
        } else {
          //return data to the client
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Car.",
        });
      });
  } else {
    Cardb.find()
      .then((id) => {
        res.send(id);
      })
      .catch((err) => {
        res.status(500).send({
          message: "No cars are found",
        });
      });
  }
};

export const updateCar_API = (req, res) => {
  //Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const id = req.params.id;
  // Find car and update it with the request body
  Cardb.findByIdAndUpdate(id, req.body, { carFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot update the car with this ${id}` });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating the car.",
      });
    });
};
export const deleteCar_API = (req, res) => {
  //Validate request
  let id = req.params.id;
  Cardb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete the car with this ${id}`,
        });
      } else {
        res.send({ message: `Car id: ${id} deleted successfully!` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while deleting the Car.",
      });
    });
};
