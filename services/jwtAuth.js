require("dotenv/config")
const jwt=require("jsonwebtoken")
const secrete = process.env.SECRETE_KEY;


exports.GenrateToken=async(user)=>{
    const payload={
    Email:user.Email,
    id: user._id,
    role: user.role,
    phoneno:user.phoneno
    }
    const token=jwt.sign(payload,secrete)
    return token;
}

exports.VerifyToken=async(Token)=>{
   const payload= jwt.verify(Token,secrete)
   return payload;
}