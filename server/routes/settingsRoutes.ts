import { settingsServices } from '../services/settingsServices'
import { loggerService } from '../global/logger'
import { GlobalServices } from '../global/services'

import { Router, Request, Response } from 'express'

export const settingsRoutes = Router()

settingsRoutes.post('/getConnection', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await settingsServices.getConnection(req.body.id)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(400).json({ result: result.success, message: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(200).json({ result: result.success, data: result.data })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), settingsServices.getConnection.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

settingsRoutes.post('/saveConnection', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await settingsServices.saveConnection(req.body.id, req.body.name, req.body.host, req.body.port, req.body.user, req.body.password)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(400).json({ result: result.success, message: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(200).json({ result: result.success, data: result.data })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), settingsServices.saveConnection.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})
