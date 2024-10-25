const { badRequestResponse } = require("../helpers/customMessage");
const MovieModel = require("../models/movieModel");
const SeatModel = require("../models/seatModel");

module.exports=class Movie{
    static async addmovie(movie){
        const addmov=movie.save()
        return addmov;
    }
    static async findMovie(id){
        const movie=await MovieModel.findById(id)
        if(!movie) {return false}
        else{
            return movie
    }
    }
    static async DateCh(date,Dates){
        const utcDate = new Date(Dates);

// Convert to India Standard Time (IST)
const options = { 
  timeZone: 'Asia/Kolkata', 
  year: 'numeric', 
  month: 'short', 
  day: 'numeric', 
  weekday: 'short', 
  hour: '2-digit', 
  minute: '2-digit', 
  second: '2-digit', 
  timeZoneName: 'short' 
};

// Format the date
const istDate = utcDate.toLocaleString('en-IN', options);
console.log(istDate);
        for(let i=0;i<date.length;i++){
           if(date[i].Date==istDate){
            return i;
           }
           
        }
        return false;
    }

    static async SeatDivider(seat,id){
        if(seat%3==0){
            const seatCount=seat/3;
          const  seatdone={
            movieId:id,
                 PremiumSeat:seatCount,
                   ModerateSeat:seatCount,
                 LowSeat:seatCount
            }
            return seatdone
        }else{
            const seatCount=Math.floor(seat/3);
            const  seatdone={
            movieId:id,

                PremiumSeat:seatCount,
                  ModerateSeat:seatCount,
                LowSeat:seatCount
           }
            return seatdone

        }

        return false
    }
    static async addSeat(seat){
        const add=seat.save()
        return add;
    }
    static async SeatType(SeatNumber){
        const seatinfo=SeatNumber.split(" ");
        const seatType=seatinfo[0];
        if(seatType=="P") return "PremiumSeat"
        else if(seatType="M")return "ModerateSeat"
        else return "LowSeat"
    }

    static async reduceseat(SeatType,movieId){
      const seat=await SeatModel.findOne({movieId})
      console.log(seat)
    // seatId=seat._id
    // const reduceseatValue=1;
    if(SeatType=="PremiumSeat"&&seat.PremiumSeat!=0){
     const reduceseatValue=seat.PremiumSeat-1;
     const update =await SeatModel.updateOne({_id:seat._id},{$set:{PremiumSeat:reduceseatValue}})
     console.log(update);
    }else if(SeatType=="ModerateSeat"&&seat.ModerateSeat!=0){
     const reduceseatValue=seat.ModerateSeat
     const update =await SeatModel.updateOne({_id:seat._id},{$set:{ModerateSeat:reduceseatValue}})
     console.log(update);
        
    }
    else if(seatType=="LowSeat"&&seat.LowSeat!=0){
        const reduceseatValue=seat.LowSeat
        const update =await SeatModel.updateOne({_id:seat._id},{$set:{LowSeat:reduceseatValue}})
        console.log(update);
     
    }
    // updatedate={}
   return false
    }

}