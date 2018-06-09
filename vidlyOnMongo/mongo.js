const mongo = require('mongoose');
const Joi = require('joi');

mongo.connect('mongodb://localhost/musicIndustry')
.then(()=> console.log('Connected to MONGO DB'))
.catch(err => console.error('Error',err.message));

const schema = mongo.Schema({
    name : {
        type:String,
        maxlength:10,
        required:true
    },
    album : {
        type:String,
        enum : ['JAZZ','ROCK','POP']
    }
});

const Genere = mongo.model('Genere',schema);
const genere = new Genere();

function validateGeneres(genere){
    const schema = {
        name : Joi.string().max(10).required(),
        album : Joi.string().required()
    };

    return Joi.validate(genere,schema);
}

exports.GenereMongo = Genere;
exports.validate = validateGeneres;