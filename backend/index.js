const express=require("express");

const cors=require("cors");
const DataBase=require("./Db/Db")
const book_router=require("./routers/Books_routes");

const app=express();

DataBase();

app.use(express.json());

app.use(cors());

require("dotenv").config();



app.use("/api",book_router);

app.listen(process.env.PORT,()=>{
    console.log(`Serverr is running at http://localhost:${process.env.PORT}`);
})



