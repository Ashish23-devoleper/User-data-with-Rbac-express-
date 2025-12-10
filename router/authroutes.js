const express = require("express");
const {register,login, getuser, deleteuser, getdata}=require("../controller/authcontroller")
const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/:name",getuser)
router.post("/du",deleteuser);
router.post("/admin",getdata);
module.exports=router;
