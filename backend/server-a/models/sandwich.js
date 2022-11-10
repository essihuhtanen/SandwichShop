const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toppingSchema = require('./topping').schema;

const sandwichSchema = new Schema ({
    id: {
        type: Number,
        set: num => { return Math.round(num); }
    },
    name: {
        type: String,
        required: true
    },
    toppings: {
        type: [toppingSchema]
    },
    breadType: {
        type: String,
        enum: ['oat', 'rye', 'wheat'],
        required: true
    }
});

sandwichSchema.set('toJSON', { virtuals: false, versionKey: false });

const Sandwich = new mongoose.model('Sandwich', sandwichSchema, 'sandwiches');
module.exports = Sandwich;