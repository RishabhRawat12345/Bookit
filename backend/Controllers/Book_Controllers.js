const PackageSchema=require("../Models/Book_Models");


const getdata = async (req,res) => {
  try {
    
    const result = await PackageSchema.find();
    res.status(200).json({"message":"data is successfully fetch",result});
  } catch (error) {
    res.status(500).json({"message":"Insternal Server Error",error});
  }
};

module.exports=getdata
