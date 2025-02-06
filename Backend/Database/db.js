import mongoose from "mongoose";
const connectDatabse = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:"pinterest",
        });
        console.log("Mongodb connected");
        
    } catch (error) {
        console.log(error);
    }
}
export default connectDatabse;