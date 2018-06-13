const express = require('express');
const {Genre,validate} = require('../models/Genre');
const router = express.Router();

router.get('/', async (request,response)=>{
    const genre = await Genre.find().select();
    response.send(genre);
});

module.exports = router;