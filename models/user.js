const mongoose = require("mongoose");
const {v4 : uuidv4} = require("uuid");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true,
        unique: true,
        default: function() {
            return uuidv4();
        }
    }
}, {
        timestamps : true
    });

const User = mongoose.model ("user", userSchema);

module.exports = User;