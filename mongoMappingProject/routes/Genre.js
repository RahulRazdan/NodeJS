const asyncMidleware = require('../middleaware/async');
const auth = require('../middleaware/login');
const admin = require('../middleaware/admin');
const express = require('express');
const { Genre, validate } = require('../models/Genre');
const router = express.Router();

/*router.get('/', auth, asyncMidleware(async (request, response) => {
    const genre = await Genre.find().select();
    response.send(genre);
}));*/

router.get('/', auth, async (response) => {
    const genre = await Genre.find().select();
    response.send(genre);
});

router.delete('/:id', [auth, admin], async (request, response) => {
    const genre = await Genre.findByIdAndRemove({ _id: request.params.id });
    if (!genre)
        return response.status(400).send('Invalid Genre Id');
    response.send(genre);
});

module.exports = router;