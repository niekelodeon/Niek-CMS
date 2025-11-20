import express, { Request, Response, Router } from 'express'

import { loggerService } from '../global/logger'
import { Token } from '../global/token'

import { authServices } from '../auth/authServices'

export const authRoutes = Router()

authRoutes.post('/Register', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await authServices.Register(req.body.email, req.body.password)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(400).json(result.message)
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.redirect('auth/Login')
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, 'authServices.ts', authServices.Register.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

authRoutes.post('/Login', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await authServices.Login(req.body.email, req.body.id, req.body.password)

        if (result.success) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message, token: result.token })
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json({ result: result.succes, message: result.message })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, 'authServices.ts', authServices.Login.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

authRoutes.post('/Logout', async (req: Request, res: Response) => {
    // remove token
})
