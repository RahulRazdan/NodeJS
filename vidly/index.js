const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const home = require('./routes/home');
const genere = require('./routes/genere');
const log = require('./middleware/logger');
const infoLevel = require('debug')('app:info');
const debugLevel = require('debug')('app:debug');
const auth = require('./middleware/authentication')

const express = require('express');
const app = express();

app.use(helmet());
app.set('view engine','pug');
app.set('views','./views');
app.use(express.json());
app.use(express.static('public'));
app.use(log);
app.use(auth);
app.use('/api/generes',genere);
app.use('/',home);

console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
console.log(`APP_NODE_ENV : ${app.get('env')}`);
console.log("App Name: "+config.get('name'));
console.log("Mail Server: "+config.get('mail.host'));
console.log("Mail Server Password: "+config.get('mail.password'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    infoLevel('Morgan logging enabled...')
}

debugLevel('This is DEBUG level');

var port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
});