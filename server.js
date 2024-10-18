require("dotenv/config")
const express=require("express")
const app=express();
const PORT=process.env.PORT;
const mongoose=require("mongoose")
const routes=require("./routes/test")
// connection 
mongoose
  .connect(process.env.MONGOOSE)
  .then(() => {
    console.log("Mongodb connect");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/test",routes)

app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.listen(PORT,()=>{
    console.log(`the server running on the :${PORT}`)
})