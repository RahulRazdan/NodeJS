const mongo = require('mongoose');
const express = require('express');
const config = require('config');
const {movieSchema} = require('./models/Movie')
const movie = require('./routes/Movie')
const genre = require('./routes/Genre')
const rental = require('./routes/Rental')
const user = require('./routes/User')
const login = require('./routes/Login')

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const app = express();

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR : jwtPrivateKey not defined');
    process.exit(1);
}

mongo.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB...'))
.catch((err) => console.error('Coulnt connect to mongo db',err.message));

app.use(express.json());
app.use('/api/movies',movie);
app.use('/api/genres',genre);
app.use('/api/rentals',rental);
app.use('/api/users',user);
app.use('/api/login',login);

var port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
});