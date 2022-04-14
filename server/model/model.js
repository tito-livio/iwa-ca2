/**
 * @author Tito Livio - 2018253
 * @description This file is responsible to create the MongoDB schema for the car collection
 * */

//importing a mongoose module
import mongoose from "mongoose";

var schema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    fuel: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ecoType: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    }
})

//Variable to export the schema
const CarDB = mongoose.model('cardb', schema);

//Making the schema available globally
export default CarDB;