import axios from "axios";
import Cardb from '../model/model.js';

export const index_app = (req, res) => {
    //making a get request to /api/car
    axios.get('http://localhost:4000/api/car')
        .then((response) => {
            res.render('index', { car: response.data });
        })
        .catch(error => {
            res.send(error)
        });
}

export const edit_car_app = (req, res) => {
    //making a get request to /api/car
    axios.get('http://localhost:4000/api/car')
        .then((response) => {
            res.render('edit_car', { car: response.data });
        })
        .catch(error => {
            res.send(error)
        });
}

export const add_car_app = (req, res) => {
    res.render('add_car');
}

//Create & save new Car 
export const createCar_app = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    //Create new Car
    const car = new Cardb({
        name: req.body.name,
        type: req.body.type,
        fuel: req.body.fuel,
        price: req.body.price,
        ecoType: req.body.ecoType
    });
    //save car into database
    car
        .save(car)
        .then(data => {
            res.redirect('/add-car');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the car."
            });
        })
}


export const update_car_app = (req, res) => {
    axios.get('http://localhost:4000/api/car/', { params: { id: req.query.id } })
        .then(cardata => {
            res.render("update_car", { car: cardata.data })
        })
        .catch(error => {
            res.send(error);
        })
}
export const delete_car_app = (req, res) => {

}