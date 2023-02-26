const express=require("express")
const mongoose=require("mongoose")
const {connection}=require("./config/db")
const userRoute=require("./routes/user.routes")
const ProductRoute=require("./routes/product.routes")
const CartRoute=require("./routes/cart.routes")
const OrderRoute=require("./routes/order.routes")
const StripeRoute=require("./routes/stripe.routes")

const auth=require("./routes/auth.routes")
const dotenv=require("dotenv")   
const cors=require("cors")
dotenv.config() 

const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/auth",auth)
app.use("/api/user",userRoute)
app.use("/api/product",ProductRoute)
app.use("/api/cart",CartRoute)
app.use("/api/order",OrderRoute)
app.use("/checkout",StripeRoute)


app.listen(process.env.port||8080,async()=>{
    try {
       await connection
       console.log("db is running")
    } catch (error) {
        console.log(error)
    }
    console.log("backend server is running  ")
})
