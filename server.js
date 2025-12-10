const express= require("express");
const dotenv=require("dotenv").config();
const app= express();
const dbconnect=require("./config/dbconnect.js");
const authroutes=require("./router/authroutes.js")
dbconnect();

//middleware
app.use(express.json());

//routers
app.use("/api/auth",authroutes)
const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT} `)
})