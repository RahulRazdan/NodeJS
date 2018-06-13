const _ = require('lodash');
const express = require('express');
const {User,validate,validatePassword} = require('../models/User');
const router = express.Router();

router.post('/',async (request,response) => {
    let result = validate(request.body);

    if(result.error)
        return response.status(400).send(result.error.details[0].message);

    result = validatePassword(request.body.password);

    if(result.error)
        return response.status(400).send('Password does not meet required complexity');

    let user = await User.findOne({ email : request.body.email});

    if(user)
        return response.status(400).send('User is already registered!!');

    user = new User(_.pick(request.body,['name','email','password']));

    await user.save();

    response.send(_.pick(user,['id','name','email']));
});

module.exports = router;