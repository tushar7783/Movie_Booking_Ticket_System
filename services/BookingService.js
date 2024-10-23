


module.exports=class Booking{
    static async add(book){
        const added=await book.save();
        return added;
    }

}