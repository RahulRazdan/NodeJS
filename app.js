const path = require('path');
const os = require('os');
const logger = require('./logger');
const fs = require('fs');

console.log(logger);

function sayHi(name){
	logger.logger(name);
}

sayHi('Rahul Razdan');
console.log(module);

var pathObject = path.parse(__filename);
console.log(pathObject);

console.log(`Total Memory : ${os.totalmem()}`);
console.log("Total Free Memory : " + os.freemem());

// Synchronous
var files = fs.readdirSync('./');
console.log(files);

//Asynchronus
fs.readdir('./',function(err,files){
	if(err)
		console.log('Error ', err);
	else
		console.log('Results ',files);
});
