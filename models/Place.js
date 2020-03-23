const mongoose = require('mongoose'); 

const PlaceSchema = mongoose.Schema({
    name : {
        type: String,
        required :  true
    },
    location : {
        type: String,
        require : true
    }
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place

