import path from 'path'

import { loggerService } from '../global/logger'
import { UploadServices } from '../edit/uploadServices'

import { ftpServices } from '../edit/ftpServices'
import { fsServices } from '../edit/fsServices'

import { Router, Request, Response } from 'express'

export const editRoutes = Router()

// renaming middleware
const memoryUpload = UploadServices.Filter()

// Projects:
// show the projects the user has

// Dashboard:
// show the project the user is working in

// Settings:
// show the settings of the user

// ftpServices:
// editRoutes.get('/Structure', async (req: Request, res: Response) => {
//     let result = null

//     try {
//         result = await ftpServices.Structure(req.body.options)

//         if (!result.success) {
//             loggerService.Logger('INFO', req.body.username, req.ip, req.route.path.path, result.file, result.function, result.logMessage)
//             res.status(400).json(result.message)
//         } else {
//             loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
//             res.status(200).json(result.message)
//         }
//     } catch (err) {
//         loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, "fsServices.ts", ftpServices.Structure.name, err.message) 
//         res.status(500).json("Something went wrong, please try again")
//     }
// })

editRoutes.get('/DownloadProject', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await ftpServices.downloadProject(req.body.options, req.body.remoteDir, req.body.localDir) 

        if (!result.success) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(400).json(result.message)
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json(result.message)
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, "fsServices.ts", ftpServices.downloadProject.name, err.message) 
        res.status(500).json("Something went wrong, please try again")
    }
})

// editRoutes.post('/PublishProject', async (req: Request, res: Response) => {
//     let result = null

//     try {
//         result = await ftpServices.publishProject(req.body.options, req.body.selectedProject, req.body.remotePath) 

//         if (!result.success) {
//             loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
//             res.status(400).json(result.message)
//         } else {
//             loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
//             res.status(200).json(result.message)
//         }
//     } catch (err) {
//         loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, "fsServices.ts", ftpServices.publishProject.name, err.message) 
//         res.status(500).json("Something went wrong, please try again")
//     }
// })

// fsServices:
editRoutes.post('/Save', async (req: Request, res: Response) => {
    let result = null

    console.log(path.basename)

    try {
        result = await fsServices.Save(req.body.path, req.body.content)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(400).json(result.message)
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json(result.message)
        }
    } catch (err) {
        console.log(__filename)
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, __filename, fsServices.Save.name, err.message) 
        res.status(500).json("Something went wrong, please try again")
    }
})

editRoutes.post('/addFile', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await fsServices.addFile(req.body.path, req.body.name)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(400).json(result.message)
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json(result.message)
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, "fsServices.ts", fsServices.addFile.name, err.message) 
        res.status(500).json("Something went wrong, please try again")
    }
})

editRoutes.post('/addFolder', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await fsServices.addFolder(req.body.path)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(400).json(result.message)
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json(result.message)
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, "fsServices.ts", fsServices.addFolder.name, err.message) 
        res.status(500).json("Something went wrong, please try again")
    }
})

editRoutes.post('/Rename', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await fsServices.Rename(req.body.path, req.body.newName)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(400).json(result.message)
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.logMessage)
            res.status(200).json(result.message)
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, "fsServices.ts", fsServices.Rename.name, err.message) 
        res.status(500).json("Something went wrong, please try again")
    }
})

editRoutes.post('/Move', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await fsServices.Move(req.body.paths)

        if (result.message.success > 0) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.message.success.join('. ') + ' ' + result.message.failed.join('. '))
            res.status(400).json(result.message)
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.message.success.join('. ') + ' ' + result.message.failed.join('. '))
            res.status(200).json(result.message)
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, "fsServices.ts", fsServices.Move.name, err.message) 
        res.status(500).json("Something went wrong, please try again")
    }
})

editRoutes.post('/Upload', memoryUpload.single('file'), async (req: Request, res: Response) => {
    let result = null

    try {
        result = await UploadServices.uploadStream(req.file.buffer, req.body.path)

        if (result.message.success > 0) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.message.success.join('. ') + ' ' + result.message.failed.join('. '))
            res.status(400).json(result.message)
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.message.success.join('. ') + ' ' + result.message.failed.join('. '))
            res.status(200).json(result.message)
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, "fsServices.ts", UploadServices.uploadStream.name, err.message) 
        res.status(500).json("Something went wrong, please try again")
    }
})

editRoutes.post('/Delete', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await fsServices.Delete(req.body.paths)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.message.success.join('. ') + ' ' + result.message.failed.join('. '))
            res.status(400).json(result.message)
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.message.success.join('. ') + ' ' + result.message.failed.join('. '))
            res.status(200).json(result.message)
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, "fsServices.ts", fsServices.Delete.name, err.message) 
        res.status(500).json("Something went wrong, please try again")
    }
})

editRoutes.post('/Download', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await fsServices.Download(req.body.paths, res)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.message.success.join('. ') + ' ' + result.message.failed.join('. '))
            res.status(400).json(result.message)
        } else {
            loggerService.Logger('INFO', req.body.username, req.ip, req.route.path, result.file, result.function, result.message.success.join('. ') + ' ' + result.message.failed.join('. '))
            res.status(200).json(result.message)
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.username, req.ip, req.route.path, "fsServices.ts", fsServices.Download.name, err.message) 
        res.status(500).json("Something went wrong, please try again")
    }
})





