const {Schema,model}=require("mongoose");
const BookingSchema=Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
    },
    GuestId:{
     type:Schema.Types.ObjectId,
     required:true,
     ref:"UserInfo"
    },
    MovieId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"MovieInfo",
    },
    Date:{
        Type:Date
    },
    payment:{type:Number,default:0},
    created_at:{ type: Date, default: Date.now }

})

const BookingModel= model("BookInfo",BookingSchema)

module.exports=BookingModel