const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log(`connected on ${mongoose.connection.host}`);
    }catch(error){
        console.log('Db Connection error');
    }
}
module.exports = connectDB;