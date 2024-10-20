const{badRequestResponse,okResponse}=require("../helpers/customMessage");
const UserModel = require("../models/userModel");
const UserService=require("../services/userService")
const Jwtauth=require("../services/jwtAuth")
exports.signup=async(req,res)=>{
    try {
        const{Name,Email,password,Phoneno}=req.body;
        const hashPassword=await UserService.hashPassword(password)
        const newUser = new UserModel({
            Name,
            Email,
            password: hashPassword,
            Phoneno,
          });
        const user=await UserService.createUser(newUser)
        if(!user) return badRequestResponse(req,res,user);
        else{
            return okResponse(req,res,`User Created` )
        }
        
        // console.log(hashPassword);

        // return okResponse(req,res,hashPassword);

        
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,`something went wrong`)
    }
}

exports.login=async(req,res)=>{
    try {
        const{Email,password}=req.body;
        const userExist=await UserService.getUser(Email)
        if(!userExist) return badRequestResponse(req,res,`Register Yourself First`)
        const matchPassword=await UserService.matchPassword(userExist,password)
        if(!matchPassword) return badRequestResponse(req,res,`Invalid Password`)
        const token= await Jwtauth.GenrateToken(userExist) 
        if(token) return okResponse(req,res,`Token:${token}`)
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,`something went wrong`)
    }
}