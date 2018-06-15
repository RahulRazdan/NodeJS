
const mongo = require('mongoose');
const winston = require('winston');

module.exports = function(){
    mongo.connect('mongodb://localhost/playground')
    .then(()=> winston.info('Connected to MongoDB...'));
}