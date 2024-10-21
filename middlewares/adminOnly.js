const { badRequestResponse, unauthorizedResponse } = require("../helpers/customMessage");
const UserModel = require("../models/userModel");

class AdminOnly{
    async RoleCheckAmin(req,res,next){
        const isExist=await UserModel.findById(req.user.id);
        if(!isExist) return badRequestResponse(req,res,`Register yourself`)
        if(isExist.role=="Admin"){
            next()
        }else{
            return unauthorizedResponse(req,res, `Only Admin Can Access This Data`)
        }
    }
}

module.exports=new AdminOnly().RoleCheckAmin