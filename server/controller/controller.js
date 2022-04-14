import Cardb from '../model/model.js';

//Create & save new Car 
export const createCar_API = (req, res) => {
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
            res.redirect('/api/car');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the car."
            });
        })
}

export const findCar_API = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Cardb.findById(id).then((data) => {
            if (!data) {
                res.status(404).send({
                    message: "Car not found with id: " + id
                });
            } else {
                res.send(data);
            }
        }).catch((err) => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving Car." });
        });
    } else {

        Cardb.find()
            .then((id) => {
                res.send(id)
            })
            .catch(err => {
                res.status(500).send({
                    message: "Car not found with id: " + id
                });
            });
    }
}

export const updateCar_API = (req, res) => {
    //Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    const id = req.params.id;
    // Find car and update it with the request body
    Cardb.findByIdAndUpdate(id, req.body, { carFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update the car with this ${id}` });
            }
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating the car."
            });
        })

}
export const deleteCar_API = (req, res) => {
    //Validate request 
    let id = req.params.id;
    Cardb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete the car with this ${id}`
                });
            } else {
                res.send({ message: `Car id: ${id} deleted successfully!` });
            };
        }).catch(err => {
            res.status(500).send({
                message: "Some error occurred while deleting the Car."
            });
        });

}