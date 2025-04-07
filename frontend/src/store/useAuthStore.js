import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';
import io from 'socket.io-client'

const BASE_URL = "http://localhost:3000"
export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    isLoggingOut:false,
    onlineUsers:[],
    socket:null,

    checkAuth:  async()=>{
        try {
            const res = await axiosInstance.get('/auth/check')
            get().connectSocket()
            set({authUser:res.data})
        } catch (error) {
            console.log("Error in the checkAuth",error)
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
    },

    signUp :    async(data)=>{
        set({isSigningUp:true})
        try {
        const res = await axiosInstance.post('/auth/signup',data)
        set({authUser:res.data})
        toast.success("Account Created Successfully");
        get().connectSocket()
        } catch (error) {
           toast.error(error.response.data.message)
        }
        finally{
            set({isSigningUp:false})
        }
    },

    logIn : async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post('/auth/login',data)
            set({authUser:res.data})
            toast.success("Logged in")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isLoggingIn:false})
        }
    },

    logOut: async()=>{
        set({isLoggingOut:true})
        try {
            const res = await axiosInstance.post('/auth/logout')
            console.log(res)
            set({authUser:null})
            toast.success("Logged out successfully")
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isLoggingOut:false})
        }
        
    },

    updateProfile:  async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res = await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
            toast.success("Profile updated Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isUpdatingProfile:false})
        }
    },

    connectSocket: ()=>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return
        const socket = io(BASE_URL,{
            query:{
                userId:authUser._id
            }
        })
        socket.on("connect",()=>{
            console.log("Connect to server",socket.id)
        })
        socket.connect()
        set({socket:socket})

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },

    disconnectSocket: ()=>{
        if(get().socket?.connected) get().socket.disconnect()
        set({socket:null})
    }
   
}))