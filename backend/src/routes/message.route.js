import express from 'express'
import { getUsersForSideBar,sendMessage,getMessages } from '../controllers/message.controller.js'
const router = express.Router()
import { protectedRoute } from '../middlewares/auth.middleware.js'



router.get('/users',protectedRoute,getUsersForSideBar)
router.get('/:id',protectedRoute,getMessages)
router.post('/send/:id',protectedRoute,sendMessage)



export default router
