require("dotenv/config")
const crypto = require("crypto");
const axios = require("axios");
const{badRequestResponse,okResponse}=require("../helpers/customMessage");
const UserModel = require("../models/userModel");
const UserService=require("../services/userService")
const Jwtauth=require("../services/jwtAuth")
const twilio = require('twilio');
const MovieService=require("../services/movieService");
const BookingService = require("../services/BookingService");
const BookingModel=require("../models/bookingModel")
const salt_key = process.env.SALT_KEY;
merchant_id = process.env.MERCHANT_ID;


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
        return badRequestResponse(req,res,error)
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
        return badRequestResponse(req,res,error)
    }
}
exports.logout=async(req,res)=>{
    try {

        
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,error)
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
        return badRequestResponse(req,res,error)
        
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
        return badRequestResponse(req,res,error)
    }
}
exports.bookMovie=async(req,res)=>{
    try {
        const {Name,Email}=req.user
        // console.log(req.user)
        const GuestId=req.user.id;
        const{Date,MovieId,SeatNumber}=req.body;
        const Movie= await MovieService.findMovie(MovieId)
        const seatType= await MovieService.SeatType(SeatNumber)
        // const movieId=movie.id;
        
        // console.log(Movie.ShowTime[0].Date)
if(!Movie) {return badRequestResponse(req,res,"Somethimg went wrong ")}
        // const date=await MovieService.DateCh(Movie.ShowTime,Date)
        
        
        const book=new BookingModel({
            Name,
            Email,
            GuestId,
            MovieId,
            Date,
            SeatNumber
        })
    //    if(movie.Showtime)
        const Booking=await BookingService.add(book)
        if(!Booking) return badRequestResponse(req,res,"Something Went Wrong");
        const seatReduce=await MovieService.reduceseat(seatType,MovieId)
        // const seat 
    
            return okResponse(req,res,"Booking added");
    

        
       


        
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,error)
    }
}
exports.newpayment=async(req,res)=>{
    try {
        merchantTransactionId = await BookingService.generateTranscationid();
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            name: req.user.Name,
            amount: req.body.amount * 100,
            redirectUrl: `http://localhost:5000/api/status/${merchantTransactionId}`,
            redirectMode: "POST",
            mobileNumber: req.user.Phoneno,
            paymentInstrument: {
              type: "PAY_PAGE",
            },
          };
          const payload = JSON.stringify(data);
    // console.log(payload);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    const Test_url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
    const options = {
        method: "POST",
        url: Test_url,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
        data: {
          request: payloadMain,
        },
      };
//   console.log(axios);
axios
.request(options)
.then(function (response) {
//   res.send(response.data);

return okResponse(req,res,response.data)
  // return res.redirect(
  //   response.data.data.instrumentResponse.redirectInfo.url
  // );
})
.catch(function (error) {
  console.error(error.response.data);
  console.error(error.response.data.data);


  return badRequestResponse(req,res,error.response.data)
});

        
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,error)
    }
}
exports.checkStatus=async(req,res)=>{
    try {
        const {merchantTransactionId,bookingId} = req.body;
  const merchantId = merchant_id;
// const {}=req.body
  const keyIndex = 1;
  const string =
    `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;

  const options = {
    method: "GET",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };
  
   // CHECK PAYMENT TATUS
   const response = await axios.request(options);

// response.data.success=true;
// response=true;
  if (response.data.success === true) {
    // const url = `http://localhost:3000/success`;
    const booking = await BookingService.findBookingandupdate(bookingId);
    // const await =
    if(!booking) return badRequestResponse(req,res,"Something went wrong");
    return okResponse(req,res,"payment done");
    
    // return okResponse(req, res, response.data);
  } else {
    // const url = `http://localhost:3000/failure`;
    return badRequestResponse(req, res, response.data);
  }
        
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,error)
    }
}

exports.QRCode=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        return badRequestResponse(req,res,error)
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
        return badRequestResponse(req,res,error)
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
        return badRequestResponse(req,res,error)
    }
}