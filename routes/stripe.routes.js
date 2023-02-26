const route=require("express").Router()
const dotenv=require("dotenv")
dotenv.config()
const stripe=require("stripe")(process.env.STRIPE_KEY)
const uuid=require("uuid").v4
const bodyparser=require("body-parser")
route.use(bodyparser.urlencoded({extended:false}))
route.use(bodyparser.json())
route.post("/payment",(req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd"
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            console.log(stripeErr)
            res.status(500).json(stripeErr)
        }else{
            // console.log(stripeRes)
            res.status(200).json(stripeRes)
        }
    })
})

route.post("/",async(req,res)=>{
   console.log(req.body)
   let error,status
   try {
       const{product,token}=req.body
       const customer=await stripe.customers.create({
         email:token.email,
         source:token.id
       })
       const key=uuid()
       const charge=await stripe.charges.create({
         amount:product.price*100,
         currency:"usd",
         customer:customer.id,
         receipt_email:token.email,
         description:`Purchased the ${product.name}`,
         shipping:{
            name:token.card.name,
            address:{
               line1:token.card.address_line1,
               line2:token.card.address_line2,
               city:token.card.address_city,
               country:token.card.address_country,
               postal_code:token.card.address_zip
            }
         }
       },{key}
       )
       console.log("charges",{charge})
       status="success"
   } catch (error) {
       console.log(error)
       status="failure"
   }
   res.json({error,status})
})

module.exports=route