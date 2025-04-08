import cloudinary from "../lib/cloudinary.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const signup = async(req,res)=>{
    try {
      const {email,fullName,password} = req.body
      if(!fullName || !email || !password){
        return res.status(400).json({message:"All fields are required"})
      }
      const user = User.findOne({email:email})
      if(!user){
        return res.status(400).json({message:"User already exists"})
      }
      const salt = await bcrypt.genSalt(10)
      const hashedPassword =  await bcrypt.hash(password,salt)
      const newUser = new User({
        email,
        fullName,
        password:hashedPassword
      })

      if(newUser){
        generateToken(newUser._id,res)
        await newUser.save()

        res.status(201).json({_id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic
        })
      }else{
        return res.status(400).json({message:"Invalid Fields"})
      }
    } catch (error) {
        console.log("error in the signUp controller",error)
        res.status(500).json({message:"Internal Server Issues"})
    }
}

export const login = async(req,res)=>{
   try {
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    const user = await User.findOne({email:email})
    if(!user){
      console.log("InvalidPassowrd")
        return res.status(400).json({message:"Invalid Credentials"})
    }
    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
      console.log("invalidPassword")
        return res.status(400).json({message:"Invalid Credentials"})
    }
    generateToken(user._id,res)
    return res.status(201).json({
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profilepic:user.profilePic
    })
   } catch (error) {
    console.log("Error in the login controller",error)
    res.status(500).json({message:"Internal Server Issues"})
   }
}

export const logut = (req,res)=>{
   try {
     res.cookie('jwt',"",{maxAge:0})
     return res.status(200).json({message:"Logged out Successfully"})
   } catch (error) {
    console.log("Error in the logout controller",error)
    return res.status(500).json({message:"Internal Server Issues"})
   }
}

export const updateProfile = async(req,res)=>{
  try {
    const {profilePic} = req.body
    const userId = req.user._id
    if(!profilePic){
      return res.status(400).json({message:"Profile pic is required"})
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)

    const updatedUser =  await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

    res.status(200).json(updatedUser)
  } catch (error) {
    console.log("Error in the profile update controller",error)
    return res.status(500).json({message:"Internal Server Issues"})
  }
}

export const checkAuth = (req,res)=>{
  try {
    if(req.user){
      return res.status(200).json(req.user)
    }
  } catch (error) {
    console.log("Error in the checkAuth Controller")
    return res.status(500).json({message:"Internal Server Issues"})
  }
}