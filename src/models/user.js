const mongoose=require('mongoose');

var Schema=mongoose.Schema;

var userSchema=new Schema({
    name:String,
    phone:String,
    password:String

},{collection:'user'});

module.exports = mongoose.model("User",userSchema);