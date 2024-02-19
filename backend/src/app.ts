import 'dotenv/config'
import express from 'express'
const app = express()
import cors from 'cors'

import { connectDB } from './database/connectDB'
import { authRoutes } from './routes/authRoutes'
import { v2 as cloudinary } from 'cloudinary'
import { userRoutes } from './routes/userRoutes'
import { todosRoute } from './routes/todosRoutes'

cloudinary.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME
})

app.use(cors())
app.use(express.json())

app.use('/api/v18/todos', authRoutes)
app.use('/api/v18/todos/account', userRoutes)
app.use("/api/v18/todos/origin", todosRoute)

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(3000, () => console.log('Server running'))
    } catch (error) {
        console.log(error)
    }
}
startServer()
