const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
})
const USER =mongoose.model('user',userSchema)

module.exports=USER