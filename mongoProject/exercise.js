const mongo = require('mongoose');

mongo.connect('mongodb://localhost/mongo-exercises')
.then(()=> console.log('Connected to MONGODB...'))
.catch(err => console.error('Error : ',err.message));

const courseSchema = mongo.Schema({
    name : {
        type : String,
        minlength : 5,
        maxlength : 10,
        trim:true
    },
    category : {
        type : String,
        enum : ['POP','JAZZ']
    },
    author : String ,
    tags : {
        type:Array,
        validate :{
            isAsync : true,
            validator: function(v,callback) {
                setTimeout(()=>{
                    callback(v && v.length > 0);
                },4000);
                
            },
            message : 'Can not be empty!!.'
        }

    },
    date : {type:Date , default : Date.now},
    isPublished : Boolean,
    price : {
        type : Number,
        required : function() { return this.isPublished;},
        get: v => Math.round(v),
        set: v => Math.round(v)
    }

});

const Course =  mongo.model('Course',courseSchema);
const course = new Course();

async function createCustomer(){
    const customer = new Course({
        name : 'KusRaz',
        category : 'POP',
        tags : ['VPI'],
        isPublished : true,
        price : 132.6
    });
    try{
    const result = await customer.save();
    console.log(result);
    }catch(ex){
        console.error(ex.message);
    }
}


async function getCourses(){
    const result = await Course
                        .find()
                        .or([{name : /.*by.*/},{isPublished : true , price : {$gt : 15}}])
                        .limit(10)
                        .sort('-price')
                        .select('name author price');
    console.log('RESULT : ',result);
}

createCustomer();