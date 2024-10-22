const express=require("express");
const routes=express.Router();
const EvntadminstratorController=require("../controllers/EvntadminstratorController")
const jwt=require("../services/JWT")
const RoleCheckAdminstrator=require("../middlewares/eventAdmintrstorOnly")

routes.post("/signup",EvntadminstratorController.signup)
routes.post("/login",EvntadminstratorController.login)
routes.post("/addmovies",jwt,RoleCheckAdminstrator,EvntadminstratorController.addMovies)



module.exports=routes
