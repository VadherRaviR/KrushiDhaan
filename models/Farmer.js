const express = require("express");
// const crop= require("./Cropes.js");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true
    },

    MobileNumber: {
        type: Number,
    },

    Address: [{
        State: { type: String, toUppercase: true },
        District: { type: String, toUppercase: true },
        Taluka: { type: String, toUppercase: true }
    }],
    ProfileImage: {
        url: String,
        filename: String,

    },
    Crope: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "crop",
        }
    ],


    Reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "review",
        }
    ],



});




let farmer = mongoose.model("farmer", userSchema);
module.exports = farmer;