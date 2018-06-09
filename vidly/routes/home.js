const express = require('express');
const router = express.Router();

router.get('/',(request,response)=> {
    response.render('index',{
        title : 'My Express App',
        message : 'Welocome to Vidly'
    });
});

module.exports = router;