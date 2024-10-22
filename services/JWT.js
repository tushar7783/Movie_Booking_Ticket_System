const { badRequestResponse,unauthorizedResponse } = require("../helpers/customMessage");
const Jwtauth=require("../services/jwtAuth")


class Token{
    async Authentication(req,res,next){
        try {
            const bearerHearder = req.headers["authorization"];
            if(bearerHearder==" ") return badRequestResponse(req,res,"Please provide Token");
            const brarer=bearerHearder.split(" ");
            const token=brarer[1];
            const decode=await Jwtauth.VerifyToken(token);
           req.user=decode
           next()

            
        } catch (error) {
            console.log(error)
            return badRequestResponse(req,res,`something went wrong`)
        }

        
    }

}

module.exports = new Token().Authentication;
