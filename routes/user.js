const express = require('express');
const router = express.Router();
const User = require('../models/User');

//All Users
router.get('/', async (req, res) =>{
    try{
        const users = await User.find().limit(10);
        res.json(users)
    }catch(err){
        res.json({
            message: err
        });
    };
});

//User Id
router.get('/:userId', async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        res.json(user)
    }catch(err){
        res.json({
            message: err
        });
    };
}); 

//Create User
router.post('/postUser', async (req, res) => {
    // console.log(req.body);
    const user = new User({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : req.body.password,
    });
    try {
        const savedUser = await user.save()
        res.json(savedUser)
    }catch(err){
        res.json({
            message: err
        });
    };
});

//Update User
router.patch('/:userId', async (req, res) =>{
    try{
        const updateUser = await User.updateOne(
            { _id : req.params.userId },
            { $set: { first_name : req.body.first_name}}
            );
        res.json(updateUser)
    }catch(err){
        res.json({
            message: err
        });
    };
});

//Delete User
router.delete('/:userId', async (req, res) => {
    try{
        const removedUser = await User.remove({
            _id: req.params.userId 
         });
         res.json(removedUser);
    }catch(err){
        res.json({
            message: err
        });
    };
});


module.exports = router;