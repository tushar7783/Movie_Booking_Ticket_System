const express=require("express");
const routes=express.Router();
const userController=require("../controllers/userController")

routes.post("/signup",userController.signup)
routes.post("/login",userController.login)


module.exports=routes;