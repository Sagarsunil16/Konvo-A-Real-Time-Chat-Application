import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"

export const getUsersForSideBar = async(req,res)=>{
    try {
        const loggedInUserId =  req.user._id
        console.log(loggedInUserId)
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        return res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in the getUsers controller")
        return res.status(500).json({message:"Internal Server Issues"})
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })

        res.status(200).json(messages)

    } catch (error) {
        console.log("Error in the get messages controller");
        return res.status(200).json({message:"Internal Server Issues"})
    }
}

export const sendMessage =  async(req,res)=>{
    try {
        const {text,image} = req.body
        const {id:receiverId} = req.params;
        const senderId = req.user._id
        let imageUrl;
        if(image){
            const cloudinaryRes = await cloudinary.uploader.upload(image)
            imageUrl = cloudinaryRes.secure_url;
        }

        const message  = new Message({
            senderId:senderId,
            receiverId:receiverId,
            text,
            image:imageUrl
        })

        await message.save()

        res.status(201).json(message)
    } catch (error) {
        console.log("Error in the sendMessage controller")
        return res.status(500).json({message:"Internal Server Issues"})
    }
}