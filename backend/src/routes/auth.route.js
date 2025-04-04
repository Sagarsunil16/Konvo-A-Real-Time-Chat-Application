import express from "express";
import { signup,login,logut,updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logut);

router.put('/update-profile',protectedRoute,updateProfile)

router.get('/check',protectedRoute,checkAuth)

export default router;
