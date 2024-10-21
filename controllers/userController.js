const{badRequestResponse,okResponse}=require("../helpers/customMessage");
const UserModel = require("../models/userModel");
const UserService=require("../services/userService")
const Jwtauth=require("../services/jwtAuth")
let OTP;
// let userOtp;add

//****************************************************************** */ guest****************************************************************************************************
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
exports.logout=async(req,res)=>{
    try {

        
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,`something went wrong`)
    }
}

exports.sentotp=async(req,res)=>{
    try {
        const {Phoneno} =req.body
        if (!Phoneno)
            return badRequestResponse(req, res, `Phone number is required`);
        const user= await UserService.getUserbyPhoneno(Phoneno)
        if(!user) return badRequestResponse(req,res,"Register Yourself");
        
        // send otp to phone number 

        // send otp to phone number 
        const geneatenumber=Math.floor(1000+Math.random()*9000)
        OTP=geneatenumber;
       if(geneatenumber)return okResponse(req,res,`OTP send ${OTP}`)


        
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,`something went wrong`)
        
    }

}
exports.verifyOtp=async(req,res)=>{
    try {
        const{Phoneno,otp}=req.body
        if(OTP!=otp) return badRequestResponse(req,res,"Invalid Otp");
        // console.log(req.user);
        const user= await UserService.getUserbyPhoneno(Phoneno)
        if(!user) return badRequestResponse(req,res,"Register Yourself");

        const token= await Jwtauth.GenrateToken(user) 
        if(token) return okResponse(req,res,`Token:${token}`)



        
        
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,`something went wrong`)
    }
}

//*********************************************************************** */ Admin***************************************************88

exports.signupAdmin=async(req,res)=>{
    try {
        const{Name,Email,password,Phoneno}=req.body;
        const role="Admin"
        const hashPassword=await UserService.hashPassword(password)
        const newUser = new UserModel({
            Name,
            Email,
            password: hashPassword,
            Phoneno,
            role
          });
        const user=await UserService.createUser(newUser)
        if(!user) return badRequestResponse(req,res,user);
        else{
            return okResponse(req,res,`User Created` )
        }
        
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,`something went wrong`)
    }
}

exports.loginAmin=async(req,res)=>{
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