import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const protectedRoute =  async(req,res,next)=>{
    try {
        const token = req.cookies.jwt

        console.log(token,"token")
        if(!token){
            return res.status(401).json({message:"Unauthorized access - No Token Provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message:"Unauthorized - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({message:"User not Found"})
        }

        req.user = user

        next()
        
    } catch (error) {
        console.log("Error in the Protected Route",error)
        return res.status(500).json({message:"Internal server issues"})
    }
}