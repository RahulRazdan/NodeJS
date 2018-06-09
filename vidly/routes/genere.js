const express = require('express');
const router = express.Router();
const Joi = require('joi');

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

router.get('/',(request,response)=>{
    response.send(generes);
});

router.delete('/:id',(request,response) =>{
    const genere = generes.find(element => element.id === parseInt(request.params.id));
    if(!genere)
        return response.status(404).send('Could not find the genere, please use add service');

    let index = generes.indexOf(genere);    
    generes.splice(index,1);
    response.send(genere);
});

router.put('/:id',(request,response)=>{
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

module.exports = router;