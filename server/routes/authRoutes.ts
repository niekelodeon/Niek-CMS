import express, { Request, Response, Router } from 'express'

import { loggerService } from '../global/logger'
import { Token } from '../global/token'

import { authServices } from '../auth/authServices'

export const authRoutes = Router()

authRoutes.post('/register', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await authServices.Register(req.body.email, req.body.password)

        if (result.success) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message, token: result.token })
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(400).json({ result: result.success, message: result.message })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, 'authServices.ts', authServices.Register.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

authRoutes.post('/login', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await authServices.Login(req.body.email, req.body.password)

        if (result.success) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message, token: result.token })
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, 'authServices.ts', authServices.Login.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

authRoutes.post('/forgot', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await authServices.Forgot(req.body.email)

        if (result.success) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message, token: result.token })
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, 'authServices.ts', authServices.Forgot.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

authRoutes.post('/reset', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await authServices.Reset(req.body.token, req.body.password)

        if (result.success) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message, token: result.token })
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, 'authServices.ts', authServices.Forgot.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

authRoutes.post('/logout', async (req: Request, res: Response) => {
    // remove token on the frontend
})
