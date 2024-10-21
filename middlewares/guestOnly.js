const { badRequestResponse, unauthorizedResponse } = require("../helpers/customMessage");
const UserModel = require("../models/userModel");

class GuestOnly{
    async RoleCheckUser(req,res,next){
     const isExist=await UserModel.findById(req.user.id);
     if(!isExist) return badRequestResponse(req,res,"Register Yourself");
     if(isExist.role=="Guest"){
        next();
     }else{
        return unauthorizedResponse(req,res,"Only Guest Can Access This Data");
     }
    }
}

module.exports=new GuestOnly().RoleCheckUser;