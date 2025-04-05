import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    isLoggingOut:false,
    onlineUsers:[],

    checkAuth:  async()=>{
        try {
            const res = await axiosInstance.get('/auth/check')
            console.log("Response from API:", res.data); // Debugging log
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
    }
   
}))