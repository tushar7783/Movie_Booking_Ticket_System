const express=require("express");
const routes=express.Router();
const userController=require("../controllers/userController")
const RoleCheckUser=require("../middlewares/guestOnly")
const Jwt=require("../services/JWT")
routes.post("/signup",userController.signup)
routes.post("/login",userController.login)
routes.post("/SentOtp",userController.sentotp)
routes.post("/verifyOtp",userController.verifyOtp)
routes.post("/bookingMovie",Jwt,RoleCheckUser,userController.bookMovie)

// Router.post("/logout",userController.logout)
routes.post("/Adminsignup",userController.signupAdmin)
routes.post("/Adminlogin",userController.loginAmin)


module.exports=routes;