import express from 'express'
import { createList, getListAndTasks } from '../controllers/List.controller.js'
import { isAuthanticated } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/',isAuthanticated,createList)
router.get('/',isAuthanticated,getListAndTasks)


export default router