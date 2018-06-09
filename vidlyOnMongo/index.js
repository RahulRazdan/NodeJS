const helmet = require('helmet');
const morgan = require('morgan');
const genere = require('./routes/genere');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.set('view engine','pug');
app.set('views','./views');
app.use(express.json());
app.use('/api/generes',genere);
app.use('/',home);

var port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
});