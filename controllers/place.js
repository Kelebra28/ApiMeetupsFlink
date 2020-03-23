const express = require('express');
const router = express.Router();
const Event = require('../models/Events');
const User = require('../models/User');
const Place = require('../models/Place')


//Create a new place
router.post('/createPlace', async (req, res) =>{
    try{
        const { 
            email,
            password,
            name,
            location
            } = req.body
        const user = await User.findByCredentials(email, password)
        .catch(err => console.log(err))
        if (!user) {
            return res.status(401).send({error: 'Login failed!'})
        }
        console.log(user);
        const place = new Place({
            name,
            location,
        })
        await place.save()
        res.json(place)
    }catch(err){
        res.json({
            message: err
        });
    };
}); 

//All place 
router.get('/', async(req, res) => {
    try{
        Place.find().populate('events').exec()
        .then(places => res.send(places))
    }catch(err){
        res.status(409).send(err);
    }
});


//Place id
router.get('/:placeId', async (req, res) =>{
    try{
        const place = await Place.findById(req.params.placeId)
        res.json(place)
    }catch(err){
        res.json({
            message: err
        })
    }
});

//Update Evemnt
router.patch('/:placeId', async (req, res) =>{
    try{
        const updatePlace = await Plave.updateOne(
            { _id : req.params.placeId },
            { $set: { location : req.body.location}}
            );
        res.json(updatePlace)
    }catch(err){
        res.json({
            message: err
        });
    };
});

//Delete Place
router.delete('/:placeId', async (req, res) => {
    try{
        const removedPlace = await Place.remove({
            _id: req.params.placeId 
         });
         res.json(removedPlace);
    }catch(err){
        res.json({
            message: err
        });
    };
});

module.exports = router