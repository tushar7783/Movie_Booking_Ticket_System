const express=require("express");
const routes=express.Router();
const userController=require("../controllers/userController")
const RoleCheckUser=require("../")

routes.post("/signup",userController.signup)
routes.post("/login",userController.login)
routes.post("/SentOtp",userController.sentotp)
routes.post("/verifyOtp",userController.verifyOtp)

// Router.post("/logout",userController.logout)
routes.post("/Adminsignup",userController.signupAdmin)
routes.post("/Adminlogin",userController.loginAmin)


module.exports=routes;