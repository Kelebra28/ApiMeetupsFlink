const mongoose = require('mongoose'); 

const PlaceSchema = mongoose.Schema({
    place : {
        type: String,
        required :  true
    }
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place