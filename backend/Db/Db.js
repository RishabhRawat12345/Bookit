const mongoose=require("mongoose");
require("dotenv").config();

const DataBase=async()=>{

    try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("mongo is connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports=DataBase;