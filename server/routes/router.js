import express from 'express';
import { createCar_API, findCar_API, updateCar_API, deleteCar_API } from '../controller/controller.js';
import { index_app, add_car_app, createCar_app, edit_car_app, update_car_app, delete_car_app } from '../services/render.js';

const route = express.Router();

/**
 * @description Endpoints for the page itseft
 * @method GET /
 */
route.get('/', index_app);

route.get('/add-car', add_car_app);
route.post('/add-car', createCar_app);


route.get('/edit-car', edit_car_app);

route.get('/update-car', update_car_app);

route.get('/delete-car', delete_car_app);

/**
 * @description These routes is the API route for the application
 * @methods GET/POST/PUT/DELETE for /api/car
 */
route.post('/api/car', createCar_API);

route.get('/api/car', findCar_API);

route.patch('/api/update/:id', updateCar_API);

route.delete('/api/delete/:id', deleteCar_API);

export default route;