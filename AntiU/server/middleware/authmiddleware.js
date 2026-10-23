// import token from "../controllers/authController.js";

// const decoded= Jwt.verify(token, JWT_SECRET);
// console.log(decoded.user_id);

import jwt from "jsonwebtoken";

const authenticateToken=(req,res,next)=>{
    const authHeader= req.headers['authorization'];
    const token= authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Authentication token required'});
    }

    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        req.user= decoded;
        next();
    }catch(err){
        return res.status(401).json({message:'Invalid or expored token'});
    }
}

export default authenticateToken;