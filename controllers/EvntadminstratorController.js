const { badRequestResponse,okResponse } = require("../helpers/customMessage");
const UserModel = require("../models/userModel");
const UserService = require("../services/userService")
const Jwtauth=require("../services/jwtAuth");
const MovieModel = require("../models/movieModel");
const MovieService=require("../services/movieService")

exports.signup=async(req,res)=>{
    try {
        const{Name,Email,password,Phoneno}=req.body
        const hashPassword=await UserService.hashPassword(password)
        const role="EventAdminstrator";
        const newUser=new UserModel({
            Name,
            Email,
            password:hashPassword,
            Phoneno,
            role,
        })
        if(!newUser){return badRequestResponse(req,res,"Something Went Wrong")}
        const user=await UserService.createUser(newUser)
        if(!user){ return badRequestResponse(req,res,`Something Went Wrong`)}
        else{ return okResponse(req,res,"User Created")}

        
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,`something went wrong`)
    }
}

exports.login=async(req,res)=>{
    try {
        const {Email,password}=req.body;
        const userExist=await UserService.getUser(Email)
        if(!userExist) return badRequestResponse(req,res,"Register Yourself")
        const matchpassword=await UserService.matchPassword(userExist,password)
        if(!matchpassword) return badRequestResponse(req,res,"Invalid password")
        const token =await Jwtauth.GenrateToken(userExist)
        if(!token) return badRequestResponse(req,res,`something went wrong`)
        
        return okResponse(req,res,`Token:${token}`);
        
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,`something went wrong`)
    }
}

exports.addMovies=async(req,res)=>{
    try {
        // const movie=new MovieModel(req.body);
        const movie=req.body;
        movie.EventAdminId=req.user.id;
        const newmovie=new MovieModel(movie)
        const add=await MovieService.addmovie(newmovie) 
        if(!add) return badRequestResponse(req,res,"something went wrong")
        
            return okResponse(req,res,"movie added");
        
        // console.log(movie);
        
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,`something went wrong`)
    }
}