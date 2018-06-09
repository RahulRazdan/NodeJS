
const infoLevel = require('debug')('app:info');
const debugLevel = require('debug')('app:debug');

const config = require('config');
const Joi = require('joi');
const log = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('./middleware/authentication')

const express = require('express');
const app = express();

console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
console.log(`APP_NODE_ENV : ${app.get('env')}`);

app.use(helmet());

console.log("App Name: "+config.get('name'));
console.log("Mail Server: "+config.get('mail.host'));
console.log("Mail Server Password: "+config.get('mail.password'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    infoLevel('Morgan logging enabled...')
}

debugLevel('This is DEBUG level');

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(express.static('public'));
app.use(log);
app.use(auth);

const generes = [
    {
        id : 1,
        name : 'POP',
        album : 10
    },
    
    {
        id : 2,
        name : 'ROCK',
        album : 20
    },
    
    {
        id : 3,
        name : 'JAZZ',
        album : 13
    }
];

function validateGeneres(genere){
    const schema = {
        name : Joi.string().max(10).required(),
        album : Joi.number().min(1).required()
    };

    return Joi.validate(genere,schema);
}

app.get('/',(request,response)=> {
    response.render('index',{
        title : 'My Express App',
        message : 'Welocome to Vidly'
    });
    //response.send('Welcome to Vidly!!');
});

app.get('/api/generes',(request,response)=>{
    response.send(generes);
});

app.delete('/api/generes/:id',(request,response) =>{
    const genere = generes.find(element => element.id === parseInt(request.params.id));
    if(!genere)
        return response.status(404).send('Could not find the genere, please use add service');

    let index = generes.indexOf(genere);
    generes.splice(index,1);
    response.send(genere);
});

app.put('/api/generes/:id',(request,response)=>{
    const genere = generes.find(element => element.id === parseInt(request.params.id));
    if(!genere)
        return response.status(404).send('Could not find the genere, please use add service');

    let result = validateGeneres(request.body);
    if(result.error)
        return response.status(400).send(result.error.details[0].message);
    
    genere.name = request.body.name;
    genere.album = request.body.album;

    response.send(genere);

});

var port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
});