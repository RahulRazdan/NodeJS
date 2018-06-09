const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// Define set of fixed records for demo.
const customers = [
    {agncy_id:12345 , name : 'Rahul'},
    {agncy_id:6789 , name : 'Razdan'},
    {agncy_id:12234 , name : 'Kusum'},
    {agncy_id:88888 , name : 'Ramesh'}
];

// function to have fixed JOI schema for validation of request body.
function validateCustomer(customer){

    const schema = {
        name : Joi.string().min(3).required()
    };

    return Joi.validate(customer,schema);
}

// root context handler GET
app.get('/', (request,response) => {
    response.send('Hello Rahul Razdan!!');
});

// GET all customers
app.get('/api/customers', (request,response) => {
    response.send(customers);
});

// GET one customer
app.get('/api/customers/:id', (request,response) => {
    const customer = customers.find(c => c.agncy_id === parseInt(request.params.id));
    if(!customer){
        response.status(404).send('Could not find customer');
        return;
    }

    response.send(customer);
    //response.send(request.params.id);
});

// GET test multiple path variables
app.get('/api/posts/:year/:month', (request,response) => {
    response.send(request.params);
    //response.send(request.query);
});

// PUT customer
app.put('/api/customers/:id',(request,response) => {
    const customer = customers.find(c => c.agncy_id === parseInt(request.params.id));
    if(!customer){
        response.status(404).send('Could not find customer');
        return;
    }

  
    const result = validateCustomer(request.body);
    //console.log(result);

    if(result.error){
        //response.status(400).send(result.error);
        response.status(400).send(result.error.details[0].message);
        return;
    }

    customer.name = request.body.name;
    response.send(customer);

});

// DELETE customer
app.delete('/api/customers/:id',(request,response) => {

    const customer = customers.find(c => c.agncy_id === parseInt(request.params.id));
    if(!customer){
        response.status(404).send('Could not find customer');
        return;
    }
    const index = customers.indexOf(customer);
    customers.splice(index,1);
    response.send(customer);
});

// POST Customer
app.post('/api/customers', (request,response) => {

    //const result = validateCustomer(request.body);
    const { error } = validateCustomer(request.body); // object destructor
    //console.log(result);

    if(error){
        //response.status(400).send(result.error);
        response.status(400).send(error.details[0].message);
        return;
    }
    const customer = {
        agncy_id : customers.length + 1,
        name : request.body.name
    };

    customers.push(customer);
    response.send(customer);
    
});

// get PORT from environment
const port = process.env.PORT || 3000;

// Start Server
app.listen(port ,() => {
    console.log(`listening on port ${port}`);
});

