import express from 'express'
import { CreateUser, getUsers, loginUser } from "../controllers/User.controller.js"


const router = express.Router()


router.post('/signup',CreateUser)
router.post('/signin',loginUser)
router.get("/",getUsers)


export default router