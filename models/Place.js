const mongoose = require('mongoose'); 

const PlaceSchema = mongoose.Schema({
    place : {
        type: String,
        required :  true
    }
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZDMzYzYxZDc0YjBmYTVkMTY5YzYiLCJpYXQiOjE1ODQ5MTExNjR9.VU7VMariP0Oo4Y0_XIgg5vC1Hx2M_oMbJqse-exAkVI
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZDMzYzYxZDc0YjBmYTVkMTY5YzYiLCJpYXQiOjE1ODQ5MTExNjR9.VU7VMariP0Oo4Y0_XIgg5vC1Hx2M_oMbJqse-exAkVI
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZDMzYzYxZDc0YjBmY...