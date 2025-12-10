const bcrypt =require("bcryptjs");
const jwt=require("jsonwebtoken");
const user=require("../models/usermodel")

const register=async(req,res)=>{
try{
const {username,password,role}=req.body;
const hashpassword=await bcrypt.hash(password,10);
const newuser=new user({username,password:hashpassword,role});
await newuser.save();
res.status(201).json({message: `new user has been registered with username ${username}`});
}catch(err){
    res.status(500).json({message:"an error occured"});
}
};
const login=async(req,res)=>{
    try{
    const {username,password}=req.body;
    const User= await user.findOne({username});
    if(!User){
        return res.status(404).json({message:"username not found"});
    }
    const isMatch=await bcrypt.compare(password,User.password);
    if(!isMatch){
        return res.status(400).json("invalid response");
    }
    const token =jwt.sign(
        {id :User._id,role:User.role},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );
    res.status(200).json({token});
}
    catch(err){
        res.status(500).json({message:"an error has occured"});
    }

   

};
const getuser=async(req,res)=>{
    try{
        const username=req.params.name;
        const User=await user.findOne({username});
        if(!User){
            return res.status(404).json({message:"username not found"});     
        }
        res.status(200).json({
            username:User.username,
            role:User.role

        });  

    }catch(err){
        res.status(500).json({message:"an error has occured"});
    }
};
const deleteuser=async(req,res)=>{
    try{
        const {username}=req.body;
        const User=await user.findOneAndDelete({username});
        if(!User){
            return res.status(404).json({message:"the username is no longer found"});
        }
        res.status(200).json({message:`user ${username} deleted successfully`});
    }
    catch(err){
        res.status(500).json({message:"an error has occured"});
}}
const getdata=async(req,res)=>{
    try{
        const {username}=req.body;
        const User=await user.findOne({username});
        if (!User){
            return res.status(404).json({message:"the username not found"});
        }
        else if (User.role==="admin"){
            const Users=await user.find();
            return res.status(200).json({Users})

        }
        else{
            return res.status(403).json({message:"invalid access"});
        }

    }catch(err){
        res.status(500).json({message:"an error has occured"});
    }
    };






module.exports={
    register,
    login,
    getuser,
    deleteuser,
    getdata
};