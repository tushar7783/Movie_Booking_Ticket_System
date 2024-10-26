const BookingModel=require("../models/bookingModel")
var QRCode = require('qrcode')

module.exports=class Booking{
    static async add(book){
        
        const added=await book.save();
        return added;
    }
    static async generateTranscationid(){
const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  const merchentPrefix = "T";
  const transactionId = `${merchentPrefix}${timestamp}${random}`;
  return transactionId;
    }

    static async findBookingandupdate(id){
        const movie =await BookingModel.updateOne({_id:id},{$set:{payment:1}});
        // console.log(movie)
        return movie
    }

    static async findbooking(userId){
        const booking=await BookingModel.findOne({GuestId:userId})
        return booking;
    }


    static async qrcode(data){
         const Qrcode= QRCode.toString(data,{type:'utf8'}, function (err, url) {
            
          })
          return Qrcode ;
    }

    static async verify(bookingId){
        const booking=await BookingModel.findById({_id:bookingId})
        // console.log(booking)
        if(booking) {return true}
        else{return false}
    }
    static async usedTooking(id){
        const upadte=await BookingModel.updateOne({_id:id},{$set:{watched:1}})
        //  console.log(upadte)
         return upadte;
    }
}