const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const CryptoJS=require("crypto-js")
const route=require("express").Router()
const Order=require("../models/order.model")

//CREATE

route.post("/",verifyToken,async(req,res)=>{
    const newOrder=new Order(req.body)
    try {
        const savedproduct=await newOrder.save()
        res.status(200).json(savedproduct)
    } catch (error) {
        res.status(500).json(error)
    }
})




//UPDATE
route.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
   
  try {
    const updateOrder=await Order.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
    res.status(200).json(updateOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

//DELETE
route.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("product hs been deleted....")
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET USER ORDER
route.get("/find/:userId",verifyTokenAndAuthorization,async(req,res)=>{
    try {
       const orders= await Order.find({userId:req.params.userId})
    //    const{password,...others}=user._doc
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET  All 
route.get("/",async(req,res)=>{
    try {
      const orders=await Order.find()
      res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get Monthly Income
route.get("/income",async(req,res)=>{
    const productId=req.query.pid
    const date=new Date();
    const lastMonth=new Date(date.setMonth(date.getMonth() -1))
    const PreviousMonth=new Date(new Date().setMonth(lastMonth.getMonth() -1))
    try {
        const income=await  Order.aggregate([
            {$match:{createdAt:{$gte:PreviousMonth}, ...(productId && {
                products:{$elemMatch:{productId}}
            })}},
            {$project:{
                month:{$month:"$createdAt"},
                sales:"$amount",
            }},{$group:{
                _id:"$month",
                total:{$sum:"$sales"},
            }}
        ])
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports=route


// {
//     "userId":"63e36a04553aab1e80a6c07f",
//     "products":[
//       {
//         "ProductId":"21345",
//         "quantity":2
//       },{
//          "ProductId":"2134gg5",
//         "quantity":1
//       }
//     ],
//     "amount":100,
//     "address":"india"
//   }