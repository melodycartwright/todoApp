const mongoose= require ('mongoose');
require('dotenv').config();
const connectDB= async () => {
    try { await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser:true,
        useUnifiedTopology:true, 
    });
    console.log ('MongoDB connected');
        
    } catch (error) {console.error('Error connecting to MongoDB', error.message);
        throw new Error('failed to connect to MongoDB');
        
    }


};
module.exports = connectDB;