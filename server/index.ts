import express, { Request, Response, Router } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { tokenMiddleware, rateLimiter } from './global/middleware'
import { Database } from './global/database'

// import { MiddlewareLogger } from './modules/logger'

const app = express()
const port = process.env.serverPort || 8000

// connecting with database
Database.Sync()

// calling middleware
app.use(
    cors({
        // use .env to get origins
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
    }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(rateLimiter.globalLimiter)
app.use('/auth', rateLimiter.authLimiter)

// app.use((req, res, next) => {
//     tokenMiddleware.Verify(req, res, next)
// })
app.use('/edit', tokenMiddleware.updateBody)

// app.use(MiddlewareLogger as any)

// calling routes as middleware
import { authRoutes } from './routes/authRoutes'
app.use('/auth/', authRoutes)

import { editRoutes } from './routes/editRoutes'
app.use('/edit/', editRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`) // get port trough env, if its not there default to 8000
})
