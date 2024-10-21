const { badRequestResponse, unauthorizedResponse } = require("../helpers/customMessage");
const UserModel = require("../models/userModel");

class EventAdminstratorOnly{
    async RoleCheckAdminstrator(req,res,next){
        const isExist=await UserModel.findById(req.user.id)
        if(!isExist) return badRequestResponse(req,res,`Register Yourself`)
        if(isExist.role=="EventAdminstrator"){
            next()
        }else{
            return unauthorizedResponse(req,res,`Only EventAdminstrator Can Access This Data`)
        }
    }
}

module.exports=new EventAdminstratorOnly().RoleCheckAdminstrator;