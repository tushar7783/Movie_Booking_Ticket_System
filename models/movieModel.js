const {Schema ,model}=require("mongoose")

const MovieSchema=Schema({
    MovieName:{
      type:String,
      unique:true
    },
    director:{
      type:String,
      required:true


    },
    releaseDate:{
        type:Date,
        required:true
    
    },
    genre:{
        type:[String],
        required:true
    },
   duration:{
    type:Number,
    required:true

   },language:{
    type:String,
    default:"Hindi"
   },
   
   posterURL:{
    type: String,
    // required: true,f=
    default: "/helpers/images/moviePoster/download (2).jpeg",
   },
   rating:{
    type:Number,
    min:0,
    max:10
    ,default:0
   },
   price:{
    type:Number,
    required:true

   },
   ShowTime:[{
    Date:{
        type:Date,
        required:true

    },
    Timing:{
        type:String,
        required:true
    },
    availableSeat:{
        type:Number
    },
  

   }],

 EventAdminId:{
    type:Schema.Types.ObjectId,
    ref:"UserInfo"
      }
    
    


})

const MovieModel=model("MovieInfo",MovieSchema)
module.exports=MovieModel;