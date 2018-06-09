const mongo = require('mongoose');

mongo.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB...'))
.catch((err) => console.error('Coulnt connect to mongo db',err.message));

const customerSchema = new mongo.Schema({
    name : { type:String, required : true},
    agncy_id : Number,
    tags : [ String ],
    date : {type:Date , default : Date.now},
    isPublished : Boolean
});

const Customer = mongo.model('Customer',customerSchema);
async function createCustomer(){
    const customer = new Customer({
        //name : 'Kusum Razdan',
        agncy_id : 4321,
        tags : ['VPI'],
        isPublished : false
    });
    try{
    const result = await customer.save();
    console.log(result);
    }catch(ex){
        console.error(ex.message);
    }
}

async function getCustomers (){
    const customer = await Customer
        .find({ isPublished : true})
        .limit(10)
        .sort({ name : 1})
        .select({name:1 , tags : 1});

    console.log(customer);
}

async function getORCustomers (){
    const customer = await Customer
        .find()
        .or([{name : 'Kusum Razdan'},{ isPublished : true}])
        .limit(10)
        .sort({ name : 1})
        .select({name:1 , tags : 1});

    console.log(customer);
}

async function getRegularExpressionCustomers (){
    const customer = await Customer
        .find({ name : /Razdan$/i})
        .limit(10)
        .sort({ name : 1})
        .select({name:1 , tags : 1});

    console.log(customer);
}

async function countCustomers (){
    const customer = await Customer
        .find({ name : /Razdan$/i})
        .limit(10)
        .sort({ name : 1})
        .count();

    console.log(customer);
}

async function paginationCustomers (){
    const pageNumber = 1;
    const pageSize = 10;

    const customer = await Customer
        .find({ name : /Razdan$/i})
        .skip((pageNumber -1) * pageSize)
        .limit(pageSize)
        .sort({ name : 1})
        .select({name:1 , tags : 1});

    console.log(customer);
}

async function updateQueryCustomers (id){

    const result = await Customer.findById(id);

    if(!result) return;

    result.isPublished = true;

    const updatedCustomer = await result.save();
    console.log(updatedCustomer);
}

async function updateCustomers (id){

    const updatedCustomer = await Customer.update({_id:id},{
        $set : {
            name : 'Rahul Razdan'
        }
    });

    console.log(updatedCustomer);
}

async function deleteCustomers (id){

    const result = await Customer.deleteOne({_id : id});
    console.log(result);
}
//deleteCustomers('5b1bf79f7de0ad399cef9632');
//updateCustomers('5b1bf79f7de0ad399cef9632');
//paginationCustomers();
//countCustomers();
//getRegularExpressionCustomers();
createCustomer();
//getCustomers();
//getORCustomers();