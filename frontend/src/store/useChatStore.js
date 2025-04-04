import {create} from 'zustand';
import {toast} from "react-hot-toast";
import {axiosInstance} from '../lib/axios'


const useChatStore = create((set)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessageLoading:false,

    getUsers: async()=>{
        set({isUsersLoading:true})
        try {
            const res =  await axiosInstance.get('/messages/users')
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isUsersLoading:false})
        }
    },

    getMessages:async(userId)=>{
        set({isMessageLoading:true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isMessageLoading:false})
        }
    },

    setSelectedUser:async(selectedUser)=>set({selectedUser:selectedUser})
}))

export default useChatStore