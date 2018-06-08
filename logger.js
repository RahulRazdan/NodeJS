console.log(__filename);
console.log(__dirname);
var url = 'http://myLogger.testing.io';

function log(message){
	console.log(message);
}

module.exports.logger = log;