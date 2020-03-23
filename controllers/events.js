const express = require('express');
const router = express.Router();
const Event = require('../models/Events');
const User = require('../models/User');


//Create a new event
router.post('/createEvent', async (req, res) =>{
    try{
        const { 
            email,
            password,
            title,
            startHour,
            endHour,
            place,
            } = req.body
        const user = await User.findByCredentials(email, password)
        .catch(err => console.log(err))
        if (!user) {
            return res.status(401).send({error: 'Login failed!'})
        }
        console.log(user);
        const event = new Event({
            title,
            startHour: new Date(startHour),
            endHour: new Date(endHour),
            place,
            organizer: user._id
        })
        await event.save()
        res.json(event)
    }catch(err){
        res.json({
            message: err
        });
    };
}); 

//All event
router.get('/', async(req, res) => {
    try{
        Event.find().populate('users').exec()
        .then(events => res.send(events))
    }catch(err){
        res.status(409).send(err);
    }
});


//Event id
router.get('/:eventId', async (req, res) =>{
    try{
        const event = await Event.findById(req.params.eventId)
        res.json(event)
    }catch(err){
        res.json({
            message: err
        })
    }
});

//Update Evemnt
router.patch('/:eventId', async (req, res) =>{
    try{
        const updateEvent = await Event.updateOne(
            { _id : req.params.eventId },
            { $set: { where : req.body.where}}
            );
        res.json(updateEvent)
    }catch(err){
        res.json({
            message: err
        });
    };
});

//Delete Event
router.delete('/:eventId', async (req, res) => {
    try{
        const removedEvent = await Event.remove({
            _id: req.params.eventId 
         });
         res.json(removedEvent);
    }catch(err){
        res.json({
            message: err
        });
    };
});


//Subcribe event
router.patch('/suscribe/:eventId' , async( req, res) =>{
    try{
        const { eventId } = req.params;
        const { password, email } = req.body;
        const user = await User.findByCredentials(email, password)
        .catch(err => console.log(err))
        if (!user) {
            return res.status(401).send({error: 'Login failed!'})
        }
        // const subscribedUser = await Event.attendants.map()
        // if(){

        // }
        Event.findByIdAndUpdate(eventId,{$push:{attendants: [user._id]}},{ new: true }).exec()
        res.status(200).send({message:'User subscribe',event:event})
    }catch(err){
        res.json({
            message: err
        });
    }
});


module.exports = router