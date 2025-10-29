const Book_Models=require("../Models/Book_Models")

const Bookes_id=async(req,res)=>{

    try {
        const {id}=req.params;
        if(!id){
            res.status(400).json({"message":"no params is found"});
        }
        const data=await Book_Models.findById(id);
        res.status(200).json({"message":"data is successfully fetch",data});
    } catch (error) {
        res.status(500).json({"message":"Internal server error"});
    }
}

module.exports=Bookes_id;