import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";


const saltRounds= 10;

const signupFunctionality= async(req,res)=>{
    
    const{name, email, password}= req.body;

    try{
        const userExists= await pool.query(
            "select user_id from users where email=$1",
            [email])
        if(userExists.rows.length > 0){
            return res.status(409).send("mail already exists")
            }

        const hash_password= await bcrypt.hash(password, saltRounds);
        
        const newUser= await pool.query(
            "INSERT INTO users(name, email, password_hash) VALUES ($1,$2,$3)",
            [name, email, hash_password]
        )

        return res.status(201).send("User registered successfully");

    }catch(error){
        return res.status(500).send("internal server error");
    }
}


const loginFunctionality= async(req,res)=>{

    const{email, password}= req.body;

    try{

        const findUser= await pool.query(
            "SELECT user_id, password_hash FROM users WHERE email=$1",
            [email]
        )

        if(findUser.rows.length> 0){
            const user= findUser.rows[0];
            const match= await bcrypt.compare(password, user.password_hash);

            if(match){
                const payload={user_Id: user.user_id}
                const token= jwt.sign(payload, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '1h'})
                return res.status(200).json({
                    message: "login successfull",
                    token: token})
            }else{
                return res.status(400).send("password didn't match");
            }
        }
        return res.status(400).send("email is not registered")

    }catch(error){
        console.log(error);
        return res.status(500).send("unknown server error");
    }

}

export {signupFunctionality, loginFunctionality};
//a module cant have multiple default expports




// 1. Get name, email, password
// 2. Check whether email already exists
// 3. If exists → return error

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX0lkIjoxMCwiaWF0IjoxNzkxNDM4OTAzLCJleHAiOjE3OTE0NDI1MDN9.ohW-ORFK3Gj5fDdiZzSS9Ycqadd2efdaI4n4qzVqFgA