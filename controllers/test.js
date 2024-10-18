const { badRequestResponse, okResponse } = require("../helpers/customMessage");
exports.test=async(req,res)=>{
    console.log("test")
    // res.send("hii");
    var t=0;
    if(t){ return okResponse(req,res,"hdshjhjdhjs")}
    else{
        return badRequestResponse(req,res, "dhjhjfhdjhfj");
    }
    
}