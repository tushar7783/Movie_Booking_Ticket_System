const express=require("express")
const route=express.Router();
const controllerTest=require("../controllers/test")

route.get("/test1",controllerTest.test)

module.exports=route;