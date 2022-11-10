const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        set: number => { return Math.round(number); }
    },

    username: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        maxLength: 50
    },

    email: {
        type: String,
        required: true,
        trim: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

    password: {
        type: String,
        required: true,
        minLength: 5,
    }

});
userSchema.set('toJSON', { virtuals: false, versionKey: false });

const User = new mongoose.model('User', userSchema, 'user_collection');
module.exports = User;