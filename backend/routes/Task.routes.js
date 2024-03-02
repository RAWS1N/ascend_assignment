import express from 'express'
import { createTask, deleteTaskById, updateTask } from "../controllers/Task.controller.js";
import { isAuthanticated } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/:listId',isAuthanticated,createTask)
router.post('/update/:taskId',isAuthanticated,updateTask)
router.delete('/:id',isAuthanticated,deleteTaskById)


export default router