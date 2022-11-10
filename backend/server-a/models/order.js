const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const sandwichSchema = require('./sandwich');

const orderSchema = new Schema({
    id: {
        type: Number,
        set: number => { return Math.round(number); }
    },
    sandwichId: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['ordered', 'received', 'inQueue', 'ready', 'failed']
    },
});

orderSchema.set('toJSON', { virtuals: false, versionKey: false });

const Order = new mongoose.model('Order', orderSchema, 'orders');
module.exports = Order;
