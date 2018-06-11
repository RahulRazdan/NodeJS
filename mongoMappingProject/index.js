const mongo = require('mongoose');
const express = require('express');
const {movieSchema} = require('./models/Movie')
const movie = require('./routes/Movie')
const genre = require('./routes/Genre')

const app = express();

mongo.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB...'))
.catch((err) => console.error('Coulnt connect to mongo db',err.message));

app.use(express.json());
app.use('/api/movies',movie);
app.use('/api/genres',genre);

var port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
});