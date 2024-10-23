require("dotenv/config")
const jwt=require("jsonwebtoken")
const secrete = process.env.SECRETE_KEY;


exports.GenrateToken=async(user)=>{
    const payload={
    Name:user.Name,
    Email:user.Email,
    id: user._id,
    role: user.role,
    phoneno:user.phoneno
    }
    const token=jwt.sign(payload,secrete,{expiresIn:"365d"})
    return token;
}

exports.VerifyToken=async(Token)=>{
   const payload= jwt.verify(Token,secrete)
   return payload;
}