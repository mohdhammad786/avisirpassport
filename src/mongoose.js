const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/node', {useNewUrlParser: true, useUnifiedTopology: true});

const db=mongoose.connection;
const Schema=mongoose.Schema;


const Car = new Schema({
    name:String,
    type:String,
    price:Number
},{collection:'cars'});

const car=mongoose.model("model",Car);

const celerio=new car({
    name:"Celerio",
    type:"Hatchback",
    price:500000,
});


 db.on('error', function (err) { throw err }); 
 
 db.once('open', function callback() {
    console.log('Mongodb connected ');
    // celerio.save((err,data)=>{
    //     if( err){
    //         console.log("error while saving");
    //         db.close();
    //     }
    //     else{
    //         console.log("data saved");
    //         db.close()
    //     }
    // })

    car.find({name:'ciaaz'},(err,data)=>{
        if(err){
            console.log("error")
        }
        else{
            console.log(data);
        }
    })


});
