import express from 'express'
import UserRoutes from './routes/User.routes.js'
import ListRoutes from './routes/List.routes.js'
import TaskRoutes from './routes/Task.routes.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

export const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/user',UserRoutes)
app.use('/list',ListRoutes)
app.use("/task",TaskRoutes)
