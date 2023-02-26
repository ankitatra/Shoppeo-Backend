const route=require("express").Router()
const User=require("../models/user.model")
const dotenv=require("dotenv")
dotenv.config()
const CryptoJS=require("crypto-js")
const jwt=require("jsonwebtoken")
const userModel = require("../models/user.model")
//REGISTER
route.post("/register",async(req,res)=>{
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:CryptoJS.AES.encrypt(req.body.password,process.env.Secret_key).toString(),
            mobile:req.body.mobile,
            age:req.body.age,
            address:req.body.address,
           
        });
        try {
            const savedUser=await newUser.save()
            res.status(201).json(savedUser)
            console.log(savedUser)
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    
})

// {
//     "username":"roji",
//     "email":"roji167892@gmail.com",
//     "password":"roji",
//     "mobile":"79",
//     "age":24,
//     "address":"mandi,Himachal Pradesh"
//   }

//LOGIN
route.post("/login",async(req,res)=>{

    try {
        const user=await userModel.findOne({username:req.body.username})
        console.log(user)
        !user &&res.status(401).json("Wrong Creditial")
        const hashPassword=CryptoJS.AES.decrypt(user.password,process.env.Secret_key)
    
        const Orginpassword=hashPassword.toString(CryptoJS.enc.Utf8)
        Orginpassword!==req.body.password &&res.status(401).json("Wrong Creditial")

        const accessToken=jwt.sign({
            id:user._id,
            isadmin:user.isadmin
        },process.env.JWT_SECRET_KEY,{expiresIn:"3d"})
        const{password,...others}=user._doc
        res.status(200).json({...others,accessToken})
    } catch (error) {
        res.status(500).json(error)
    }
       
})


module.exports=route