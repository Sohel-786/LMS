import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connect = async ()=>{
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

export default connect;