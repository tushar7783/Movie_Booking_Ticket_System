const {Schema,model}=require("mongoose");
const SeatSchema=Schema({
   movieId:{
    type:Schema.Types.ObjectId,
    ref:"MovieInfo"
   },
    PremiumSeat:{
        type:Number,
        required:true,
    },
    ModerateSeat:{
        type:Number,
        required:true,
    //  ref:"UserInfo"
    },
    LowSeat:{
        type:Number,
        required:true,
    },
   

})

const SeatModel= model("SeatInfo",SeatSchema)

module.exports=SeatModel