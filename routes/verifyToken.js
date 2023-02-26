const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(authHeader){
        const token=authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
            if(err)res.status(403).json("token is not valid")
            req.user=user
            console.log(req.user.id)
            next()

        })
    }else{
        return res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
             next()
        }else{
            res.status(403).json("You are ot allow to do that")
        }
    })
}

const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isadmin){

            next()
           
        }else{
            console.log(req.user.isAdmin)
            res.status(403).json("You are ot allow to do that") 
           
        }
    })
}
module.exports={verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}