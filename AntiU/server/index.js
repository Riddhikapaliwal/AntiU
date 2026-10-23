
//USING NODE.JS WITHOUT EXPRESS

// import http from "http"

// const server= http.createServer((req, res)=> {

//     if(req.method==='POST' && req.url=== "/")
//         res.end(`this is my new avatar ${req.url} and ${req.method}`);

//     else if(req.url ==="/sl")
//         res.end("yooo")

//     else if(req.method==="DELETE" && req.url==="/riddhi"){
//         res.end("you know this is an experiment");
//      }
//     else{
//         res.statusCode= 404
//         res.end("404")
//     }
// })

// server.listen(5000, ()=>{
//     console.log("blah blah blah http://localhost:5000")   
// })


import express from "express";
import authRoutes from "./routes/authRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import cors from "cors";
// import authenticateToken from "./middleware/authmiddleware.js";
// import profile_functionality from "./controllers/profileController.js";

const app= express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());   //used when we have to use req.body parameter

app.use('/auth',authRoutes);
app.use('/profile', profileRoutes);

app.listen(3000, ()=>{
    console.log("Server is working on http://localhost/3000")
})