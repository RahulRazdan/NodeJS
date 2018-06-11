const Joi = require('joi');
const mongo = require('mongoose');
const {genreSchema} = require('./Genre')

const movieSchema = new mongo.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        min : 5,
        max : 255
    },
    genre : {
        type : genreSchema,
        required : true
    },
    numberInStock : {
        type : Number,
        min : 0,
        max : 50,
        required : true
    },
    dailyRentalRate : {
        type : Number,
        min : 10,
        max : 20,
        required : true
    }
});

const Movie = mongo.model('Customer',movieSchema);

function validateMovies(movie){
    const schema = {
        title : Joi.string().min(5).max(255).required(),
        genreId : Joi.string().required(),
        numberInStock : Joi.number().integer().min(0).max(50).required(),
        dailyRentalRate : Joi.number().integer().min(10).max(20).required()
    };

    return Joi.validate(movie,schema);
}

exports.Movie = Movie;
exports.validate = validateMovies;
