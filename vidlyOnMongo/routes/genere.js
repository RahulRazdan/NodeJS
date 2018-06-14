const express = require('express');
const {GenereMongo,validate} = require('../mongo');
const router = express.Router();

router.get('/',(request,response)=>{
    getCustomers(response);
});

router.post('/',(request,response)=>{
    
    let result = validate(request.body);
    if(result.error)
        return response.status(400).send(result.error.details[0].message);
       
    saveCustomer(request.body,response);
});

router.delete('/:id',async (request,response) =>{
    try{
        const result = await GenereMongo.findByIdAndRemove({_id:request.params.id});
        if(!result)
            return response.status(404).send('Could not find the genere, please use add service');
        response.send(result);
    }catch(err){
        response.status(500).send(err.message);
    }
});

router.put('/:id',async (request,response)=>{
    let result = validate(request.body);
    if(result.error)
        return response.status(400).send(result.error.details[0].message);
    
    try{
        const result = await GenereMongo.findByIdAndUpdate({_id:request.params.id},{
                name : request.body.name,
                album : request.body.album
        },{new:true});

        if(!result)
            return response.status(404).send('Could not find the genere, please use add service');

        response.send(result);
    }catch(err){
        response.status(404).send(err.message);
    }

});

async function getCustomers(response){
    try{
        const results = await GenereMongo.find().sort({name:1}).select('name album');
        response.send(results);
    }catch(err){
        response.status(404).send(err.message);
    }
}

async function saveCustomer(body,response){
    const _genere = new GenereMongo({
        name : body.name,
        album : body.album
    });

    try{
        const result = await _genere.save();
        response.send(result);
    }catch(err){
        console.log('MESSAGE ',err.message);
        response.status(400).send(err.message);
    }
}

module.exports = router;