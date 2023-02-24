const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    name:{
        type:String,
        reqired: true
    },
    email:{
        type:String,
        reqired: true,
        unique: true
    },
    password:{
        type:String,
        reqired: true
    },
    date:{
        type:String,
        default:  new Date().toUTCString()
    },

});
 

module.exports = mongoose.model('user',UserSchema)