const{Schema,model}=require("mongoose")
const {createHmac}=require("crypto")

const UserSchema=Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
     type:String,
     required:true,
     
    },
    Phoneno:{
        type:Number,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now
        
    },
    booking:[{
        type: Schema.Types.ObjectId,
        ref:"BookingModel"
    }],
    role: {
        type: String,
        required: false,
        default: "Guest",
      },
})
// UserSchema.prev("save",function(next){
//     const user=this
//     if(!user.isModeifed("password")) return
//     const salt=process.env.SALT
//     const hashPassword=createHmac("sha256",salt).update(user.password).digest("hex")
//     this.password=hashPassword;


    
// })

const UserModel=model("UserInfo",UserSchema);
module.exports=UserModel
