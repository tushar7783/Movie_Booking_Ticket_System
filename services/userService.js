require("dotenv/config")
const{badRequestResponse,okResponse}=require("../helpers/customMessage");
const {createHmac}=require("crypto");
const UserModel = require("../models/userModel");
module.exports=class UserService{
    static async hashPassword(password){
        const salt=process.env.SALT;
        const crypted=createHmac("sha256",salt).update(password).digest("hex")
        return crypted;
    }
    static async createUser(newUSer){
        const user=newUSer.save()
        return user;
       
    }
    static async getUser(Email){
        const exist=UserModel.findOne({Email});
        if(!exist) return false;
        else return exist
        
    }
    static async matchPassword(user,password){
        const userpassword=user.password;
        const salt=process.env.SALT
        const hashPassword=createHmac("sha256",salt).update(password).digest("hex");
        if(hashPassword!=userpassword) return false;
        else return true

    }
}

// module.export=new UserService()