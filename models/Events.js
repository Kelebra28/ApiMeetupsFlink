const mongoose = require('mongoose'); 

const EventSchema = mongoose.Schema({
    title : {
        type: String,
        required :  true
    },
    hours : {
        type: Date,
        require : true
    },
    where : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },
   
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event