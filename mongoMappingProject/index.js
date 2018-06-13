const mongo = require('mongoose');
const express = require('express');
const {movieSchema} = require('./models/Movie')
const movie = require('./routes/Movie')
const genre = require('./routes/Genre')
const rental = require('./routes/Rental')
const user = require('./routes/User')

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const app = express();

mongo.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB...'))
.catch((err) => console.error('Coulnt connect to mongo db',err.message));

app.use(express.json());
app.use('/api/movies',movie);
app.use('/api/genres',genre);
app.use('/api/rentals',rental);
app.use('/api/users',user);

var port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
});