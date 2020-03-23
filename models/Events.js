const mongoose = require('mongoose'); 

const EventSchema = mongoose.Schema({
    title : {
        type: String,
        required :  true
    },
    startHour : {
        type: Date,
        require : true
    },
    endHour : {
        type: Date,
        require : true
    },
    place : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        require: true
    },
    attendants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    organizer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
   
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event