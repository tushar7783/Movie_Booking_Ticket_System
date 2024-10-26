const { badRequestResponse, okResponse } = require("../helpers/customMessage");
var QRCode = require('qrcode')


exports.test=async(req,res)=>{
    console.log("test")

    const text={
        name:"tushar",
        age:43,
        fibvdsfkl:"hjsdhjkfhjkd"

    }
    const stringtest=JSON.stringify(text)
   
    QRCode.toString(stringtest,{type:'utf8'}, function (err, url) {
        console.log(url)
        return okResponse(req,res,url)
      })



    // res.send("hii");
    var t=0;
    if(t){ return okResponse(req,res,"hdshjhjdhjs")}
    else{
        return badRequestResponse(req,res, "dhjhjfhdjhfj");
    }
    
}