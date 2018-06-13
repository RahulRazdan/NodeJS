const Joi = require('joi');
const mongo = require('mongoose');
const movieSchema = require('./Movie')

const rentalSchema = new mongo.Schema({
    customer : {
        type : mongo.Schema({
            name : {
                type:String,
                required : true,
                trim : true,
                max : 255
            },
            isGold : {
                type : Boolean,
                required:true
            },
            phone : {
                type:Number,
                required:true,
                min : 10
            }
        }),
        required : true
    },
    movie :{
        type : movieSchema,
        required: true
    },
    dateOut :{
        type : Date,
        required : true,
        default : Date.now
    },
    dateReturned : Date,
    rentalFee : {
        type : Number,
        min : 0
    }
});

const Rental = mongo.model('Rental',rentalSchema);

function validateRental(rental){
    const schema = {
        customer : {
            name:  Joi.string().required(),
            isGold : Joi.boolean().required(),
            phone : Joi.number().required()
        },
        movieId : Joi.objectId().required()
    };

    return Joi.validate(rental,schema);
}

exports.validate = validateRental;
exports.Rental = Rental;