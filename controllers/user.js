const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth')


   // Create a new user
router.post('/createUsers', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
});

//login user 
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body
        console.log(email,password);
        const user = await User.findByCredentials(email, password)
        .catch(err => console.log(err))
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch(err) {
        res.status(400).send(err)
        res.json({
            message: err
        })
    }

})

//All Users
router.get('/', async (req, res) => {
    try{
        const users = await User.find().limit(10);
        res.json(users)
    }catch(err){
        res.json({
            message: err
        });
    };
});

//Pagination
const paginatedResults = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
    
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
    
        const results = {}
    
        if (endIndex < await model.countDocuments().exec()) {
          results.next = {
            page: page + 1,
            limit: limit
          }
        }
        
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          }
        }
        try {
          results.results = await model.find().limit(limit).skip(startIndex).exec()
          res.paginatedResults = results
          next()
        } catch (e) {
          res.status(500).json({ message: e.message })
        }
      }
}
router.get('/paginationUser', paginatedResults(User), (req, res) => {
    
    res.json(res.paginatedResults)
});
//User me
router.get('/me', auth, async(req, res) => {
    try{
        res.send(req.user)
    }catch(err){
        res.json({
            message: err
        });
    };
})

//User Logout
router.post('/me/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})


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