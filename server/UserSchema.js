//Store schema
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        username:{
            type: String,
            min: 0,
            max: 45,
            required: true
        },
        password:{
            type: String,
            min: 0,
            max: 120,
        },
        notes: [],
        contacts: []
    });    

module.exports = new mongoose.model("user", userSchema)