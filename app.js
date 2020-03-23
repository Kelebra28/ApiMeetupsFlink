const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./controllers/user');
const eventRoutes = require('./controllers/events');
const placeRoutes = require('./controllers/place');
const PORT = process.env.PORT || 5000
require('dotenv/config');


app.use(bodyParser.json());
app.use(cors()); 
app.use('/user', userRoutes);
app.use('/event', eventRoutes);
app.use('/place', placeRoutes);


//Home Route
app.get('/', (req, res) =>{
    res.send('Home');
});



//Conext to Mongo
mongoose.connect('mongodb+srv://Kelebra28:FlinkTest@cluster0-4gajq.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('All rigth to conecto DB');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));