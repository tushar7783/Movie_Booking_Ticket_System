const MovieModel = require("../models/movieModel")

module.exports=class Movie{
    static async addmovie(movie){
        const addmov=movie.save()
        return addmov;
    }

}