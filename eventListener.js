const EventEmitter = require('events');

class MyEventListener extends EventEmitter{

    init () {
		this.on('MessageLogged', (eventArg) => {
		console.log(eventArg);
		console.log(`Testing ${eventArg.url}`);
		});

		this.on('loggedMessage', (eventArg) => {
		console.log(eventArg);
		console.log(`Logged :  ${eventArg.message}`);
		});
	}
}

module.exports = MyEventListener;