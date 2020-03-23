const express = require('express');
const router = express.Router();
const Event = require('../models/Events');


//Create a new event
router.post('createEvent', async (req, res) =>{
    try{
        const event = new Event(req.body)
        await event.save()
        res.status(201).send(event)
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
        res.json(updateUser)
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


module.exports = router