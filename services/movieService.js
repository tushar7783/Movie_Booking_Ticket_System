const { badRequestResponse } = require("../helpers/customMessage");
const MovieModel = require("../models/movieModel")

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

}