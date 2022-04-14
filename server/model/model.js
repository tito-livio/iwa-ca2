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
const CarDB = mongoose.model('cardb', schema);

export default CarDB;