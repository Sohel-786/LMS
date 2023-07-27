const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

module.exports = async ()=>{
    try {

        const {connection} = await mongoose.connect(process.env.MONGO_URI);

        if(connection){
        console.log(`Connection to MongoDB : ${connection.host}`)
        }

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}