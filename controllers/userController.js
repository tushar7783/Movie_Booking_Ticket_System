require("dotenv/config")
const{badRequestResponse,okResponse}=require("../helpers/customMessage");
const UserModel = require("../models/userModel");
const UserService=require("../services/userService")
const Jwtauth=require("../services/jwtAuth")
const twilio = require('twilio');
const MovieService=require("../services/movieService");
const BookingService = require("../services/BookingService");
const BookingModel=require("../models/bookingModel")


// Twilio credentials from your account
const accountSid = process.env.TWILOO_ACCOUNT_SID; // Replace with your Account SID
const authToken = process.env.TWILLO_AUTH_TOKEN; 
const client = new twilio(accountSid, authToken);
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
        
    //    generate otp
        const geneatenumber=Math.floor(1000+Math.random()*9000)
        OTP=geneatenumber;
  

        // send otp to phone number 
client.messages.create({
    body: `The Otp is ${geneatenumber}`,  // Message body
    from: '+13528350489',           // Your Twilio phone number
    to: `+91${req.body.Phoneno}`,              // Recipient's phone number
  })
  .then(message => console.log(`Message sent with SID: ${message.sid}`))
  .catch(error => console.error('Error sending SMS:', error));


       if(geneatenumber)return okResponse(req,res,`OTP send on the phone number ${Phoneno}`)


        
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
exports.bookMovie=async(req,res)=>{
    try {
        const {Name,Email}=req.user
        // console.log(req.user)
        const GuestId=req.user.id;
        const{Date,MovieId}=req.body;
        const Movie= await MovieService.findMovie(MovieId)
        // console.log(Movie.ShowTime[0].Date)
        if(!Movie) {return badRequestResponse(req,res,"Somethimg went wrong ")}
        // const date=await MovieService.DateCh(Movie.ShowTime,Date)
        
        
        const book=new BookingModel({
            Name,
            Email,
            GuestId,
            MovieId,
            Date,
        })

        const Booking=await BookingService.add(book)
        if(!Booking) return badRequestResponse(req,res,"Something Went Wrong");
        else{
            return okResponse(req,res,"Booking added");
        }

        
       


        
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