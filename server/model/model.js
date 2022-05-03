/**
 * @author Tito Livio - 2018253
 * @description This file is responsible to create the MongoDB schema for the car collection
 * */

//importing a mongoose module to manipulate MongoDBs databases
import mongoose from "mongoose";

//creating a new schema for the car collection
var schema = mongoose.Schema({
    //Model/Brand/Name of the car
    name: {
        type: String,
        required: true,
    },
    //Kind of body of the car
    type: {
        type: String,
        required: true,
    },
    //Kind of the fuel used by the car
    fuel: {
        type: String,
        required: true,
    },
    //Price of the car
    price: {
        type: Number,
        required: true,
    },
    //Whether the car is ecoFriendly or not
    ecoType: {
        type: String,
        enum: ["Yes", "No"],
        required: true,
    },
});

//Variable to export the schema
const CarDB = mongoose.model("cardb", schema);

//Making the schema available globally
export default CarDB;