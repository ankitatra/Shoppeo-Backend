const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const CryptoJS=require("crypto-js")
const route=require("express").Router()
const Product=require("../models/product.model")

//CREATE

route.post("/",async(req,res)=>{
    const newProduct=new Product(req.body)
    try {
        const savedproduct=await newProduct.save()
        res.status(200).json(savedproduct)
    } catch (error) {
        res.status(500).json(error)
    }
})




//UPDATE
route.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
   
  try {
    const updateProduct=await Product.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
    res.status(200).json(updateProduct)
  } catch (error) {
    res.status(500).json(error)
  }
})

//DELETE
route.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("product hs been deleted....")
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET PRODUCT
route.get("/find/:id",async(req,res)=>{
    try {
       const product= await Product.findById(req.params.id)
    //    const{password,...others}=user._doc
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET  All PRODUCT
route.get("/",async(req,res)=>{
    const qNew=req.query.new
    const qCategory=req.query.category
    const qGenere=req.query.genre
    const qSubtitle=req.query.subtitle
    try {
        let products;
        if(qNew){
            products=await Product.find().sort({createdAt:-1}).limit(1)
        }else if(qCategory){
            products=await Product.find({"category":qCategory})
        }else if(qGenere){
            products=await Product.find({"genre":qGenere})
        }else if(qSubtitle){
            products=await Product.find({"subtitle":qSubtitle})
        }else {
            products=await Product.find()
        }






        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get User Stat

module.exports=route



// {
//     "title":"nike",
//     "desc":"nike tshirt",
//     "img":["one","two","three"],
//     "cat":["tshirt","man"],
//     "category":"tshirt",
//     "subtitle":"women",
//     "genre":"indian & fusion wear",
//     "size":"L",
//     "color":"red",
//     "price":3000,
//     "discount":30
// }  