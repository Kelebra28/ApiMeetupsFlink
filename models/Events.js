const mongoose = require('mongoose'); 

const EventSchema = mongoose.Schema({
    title : {
        type: String,
        required :  true
    },
    hours : {
        type: String,
        require : true
    },
    where : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },
    asistente: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
   
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event