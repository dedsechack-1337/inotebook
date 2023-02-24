const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook?readPreference=primary&directConnection=true'
const connectToMongo =  ()=>{
    mongoose.set("strictQuery", false);
     mongoose.connect(mongoURI,()=>{
        console.log("connected to Mongo successfully")
    })
}
module.exports = connectToMongo;