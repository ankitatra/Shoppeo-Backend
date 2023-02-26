const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const CryptoJS=require("crypto-js")
const route=require("express").Router()
const Cart=require("../models/cart.model")

//CREATE

route.post("/",verifyToken,async(req,res)=>{
    const newCart=new Cart(req.body)
    try {
        const savedproduct=await newCart.save()
        res.status(200).json(savedproduct)
    } catch (error) {
        res.status(500).json(error)
    }
})




//UPDATE
route.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
   
  try {
    const updateCart=await Cart.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
    res.status(200).json(updateCart)
  } catch (error) {
    res.status(500).json(error)
  }
})

//DELETE
route.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("product hs been deleted....")
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET user cart
route.get("/find/:userId",verifyTokenAndAuthorization,async(req,res)=>{
    try {
       const cart= await Cart.findOne({userId:req.params.userId})
    //    const{password,...others}=user._doc
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET  All 
route.get("/",async(req,res)=>{
   
    try {
      const carts=await Cart.find()
      res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get User Stat

module.exports=route