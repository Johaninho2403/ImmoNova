import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorMiddleware from './middlewares/error.middleware'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})