
const BookingModel=require("../models/bookingModel")

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

}