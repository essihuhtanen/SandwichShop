const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toppingSchema = new Schema ({
    id : {
        type: Number,
        set: num => { return Math.round(num) }
    },
    name: {
        type: String,
        required: true
    }
});

toppingSchema.set('toJSON', { virtuals: false, versionKey: false });

const Topping = new mongoose.model('Topping', toppingSchema, 'toppings');
module.exports = Topping;