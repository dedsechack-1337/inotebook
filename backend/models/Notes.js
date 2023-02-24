const mongoose = require('mongoose')
const {Schema} = mongoose;

const UserSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'

    },
    title:{
        type:String,
        reqired: true
    },
    description:{
        type:String,
        reqired: true,
    },
    tag:{
        type:String,
        default: 'General'
    },
    date:{
        type:String,
        default: new Date().toUTCString()
    },

});
module.exports = mongoose.model('notes',UserSchema)