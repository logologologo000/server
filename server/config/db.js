const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conct = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser : true,
            useCreateIndex : true,
            useUnifiedTopology : true
        })
        console.log(`MongoDB Connectd: ${conct.connection.host}`)
    } catch (error) {
        console.log(`Error ${error.message}`)
        //dunno
        process.exit(1)
        
    }
}
module.exports = connectDB