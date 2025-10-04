const mongoose = require('mongoose')

module.exports = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connection To MongoDb ^_^')
    } catch (error) {
        console.log("connection failed To MongoDb", error);
        
    }
}