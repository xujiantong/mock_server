const mongoose = require("mongoose");
const Schema =  mongoose.Schema;
//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    cellPhone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String
    },
    identity: {
        type: String,
        default: "员工"
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

module.exports = User = mongoose.model("users", UserSchema);