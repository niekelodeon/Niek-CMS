import path from 'path'

import { loggerService } from '../global/logger'
import { UploadServices } from '../edit/uploadServices'

import { ftpServices } from '../edit/ftpServices'
import { fsServices } from '../edit/fsServices'
import { dashboardServices } from '../edit/dashboardServices'
import { GlobalServices } from '../global/services'

import { Router, Request, Response } from 'express'
import { FolderData, Node } from '../global/interfaces'

import { stringify } from 'flatted'

export const editRoutes = Router()

// renaming middleware
const memoryUpload = UploadServices.Filter()

// Projects:
// show the projects the user has

// Settings:
// show the settings of the user

// ftpServices:
editRoutes.post('/RemoteStructure', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await ftpServices.RemoteStructure(req.body.config)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(400).json({ result: result.success, message: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(200).json({ result: result.success, data: result.data })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), ftpServices.RemoteStructure.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

editRoutes.post('/DownloadProject', async (req: Request, res: Response) => {
    let result = null

    try {
        const projectPath = req.body.localDir + req.body.projectName

        result = await ftpServices.DownloadProject(req.body.config, req.body.remoteDir, projectPath)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage.success + '\t' + result.logMessage.failed)
            res.status(400).json({ result: result.success, data: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage.success + '\t' + result.logMessage.failed)
            res.status(200).json({ result: result.success, data: result.data })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), ftpServices.DownloadProject.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

editRoutes.post('/PublishProject', async (req: Request, res: Response) => {
    let result = null

    try {
        const projectPath = req.body.localDir + req.body.projectName

        result = await ftpServices.PublishProject(req.body.config, projectPath, req.body.remoteDir)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(400).json({ result: result.success, message: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), ftpServices.PublishProject.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

editRoutes.post('/folderTree', async (req: Request, res: Response) => {
    try {
        const projectName = req.body.localDir + req.body.projectName

        let rootNode: Node<FolderData> = new Node<FolderData>({
            path: projectName,
            type: 'directory',
            depth: 0,
            name: '/',
        })
        rootNode.children = await fsServices.folderTree(projectName, rootNode)

        // fix logs here
        loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), 'folderTree', '')
        res.status(200).send(stringify(rootNode))
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), fsServices.folderTree.name, stringify(err))
        res.status(500).send('Something went wrong, please try again')
    }
})

editRoutes.post('/getFile', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await fsServices.getFile(req.body.path)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(400).json({ result: result.success, message: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(200).json({ result: result, data: result.data })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), fsServices.getFile.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

editRoutes.post('/saveFile', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await fsServices.saveFile(req.body.path, req.body.content)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(400).json({ result: result.success, message: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), fsServices.saveFile.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

editRoutes.post('/Rename', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await fsServices.Rename(req.body.path, req.body.newName)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(400).json({ result: result.success, message: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), fsServices.Rename.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

editRoutes.post('/addFile', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await fsServices.addFile(req.body.path, req.body.name)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(400).json({ result: result.success, message: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), fsServices.addFile.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

editRoutes.post('/addFolder', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await fsServices.addFolder(req.body.path)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(400).json({ result: result.success, message: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), fsServices.addFolder.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

editRoutes.post('/Move', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await fsServices.Move(req.body.paths)

        if (result.message.success > 0) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.message.success.join('. ') + ' ' + result.message.failed.join('. '))
            res.status(400).json(result.message)
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.message.success.join('. ') + ' ' + result.message.failed.join('. '))
            res.status(200).json(result.message)
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), fsServices.Move.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

editRoutes.post('/Upload', memoryUpload.single('file'), async (req: Request, res: Response) => {
    let result = null

    try {
        result = await UploadServices.uploadStream(req.file.buffer, req.body.path)

        if (result.message.success > 0) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.message.success.join('. ') + ' ' + result.message.failed.join('. '))
            res.status(400).json(result.message)
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.message.success.join('. ') + ' ' + result.message.failed.join('. '))
            res.status(200).json(result.message)
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), UploadServices.uploadStream.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

editRoutes.post('/Delete', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await fsServices.Delete(req.body.paths)
        console.log(result)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.message)
            res.status(400).json({ message: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.message)
            res.status(200).json({ message: result.message })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), fsServices.Delete.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

editRoutes.post('/Download', async (req: Request, res: Response) => {
    try {
        await fsServices.Download(req.body.paths, res)

        loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), fsServices.Download.name, 'Download started')
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), fsServices.Download.name, err.message)

        if (!res.headersSent) {
            res.status(500).end()
        }
    }
})
