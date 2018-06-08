const EventEmitter = require('events');
var emitter = new EventEmitter();

emitter.on('MessageLogged',function(){
	console.log('Testing')
});

emitter.emit('MessageLogged');