const mongoose=require("mongoose")
const ProductSchema=new mongoose.Schema(
    {
        title:{type:String,required:true,},
        desc:{type:String,required:true},
        img:{type:Array},
        cat:{type:Array},
        category:{type:String,required:true},
        subtitle:{type:String,required:true},
        genre:{type:String,required:true},
        size:{type:Array},
        color:{type:String,required:true},
        price:{type:Number,required:true},
        discount:{type:Number,required:true},
        inStock:{type:Boolean,default:true}
    },
    {timestamps:true}
)
module.exports=mongoose.model("Product",ProductSchema)


// {
//     "title":"nike",
//     "desc":"Men's Purple Seek Balance Graphic Printed T-shirt",
//     "img":["https://images.bewakoof.com/t1080/men-s-purpleseek-balance-t-shirt-580213-1676031906-1.jpg",
//     "https://images.bewakoof.com/original/men-s-purpleseek-balance-t-shirt-580213-1676031911-2.jpg",
//     "https://images.bewakoof.com/t96/men-s-purpleseek-balance-t-shirt-580213-1676031917-3.jpg",
//     "https://images.bewakoof.com/t96/men-s-purpleseek-balance-t-shirt-580213-1676031922-4.jpg",
//     "https://images.bewakoof.com/t96/men-s-purpleseek-balance-t-shirt-580213-1676031927-5.jpg"
//     ],
//     "cat":["T-Shirt","men"],
//     "category":"T-Shirt",
//     "subtitle":"men",
//     "genre":"Topwear",
//     "size":"L",
//     "color":"red",
//     "price":399,
//     "discount":73
//   }