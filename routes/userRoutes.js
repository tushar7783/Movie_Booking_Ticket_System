const express=require("express");
const routes=express.Router();
const userController=require("../controllers/userController")
const RoleCheckUser=require("../middlewares/guestOnly")
const RoleCheckAdmin=require("../middlewares/adminOnly")
const Jwt=require("../services/JWT")
routes.post("/signup",userController.signup)
routes.post("/login",userController.login)
routes.post("/SentOtp",userController.sentotp)
routes.post("/verifyOtp",userController.verifyOtp)
routes.post("/bookingMovie",Jwt,RoleCheckUser,userController.bookMovie)
routes.post("/bookingMovie/payment",Jwt,RoleCheckUser,userController.newpayment)
routes.post("/bookingMovie/payment/checkStatus",Jwt,RoleCheckUser,userController.checkStatus)
routes.post("/qr-code",Jwt,RoleCheckUser,userController.QRCode)
routes.post("/qr-code-verify",Jwt,RoleCheckUser,userController.verifyQR)
routes.post("/search-Movie/:key",Jwt,RoleCheckUser,userController.Search)


// Router.post("/logout",userController.logout)
// admin
routes.post("/Adminsignup",userController.signupAdmin)
routes.post("/Adminlogin",userController.loginAmin)
routes.get("/get-all-user",Jwt,RoleCheckAdmin,userController.getAllUser)


module.exports=routes;