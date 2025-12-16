import fs from 'fs-extra'
import archiver from 'archiver'
import path from 'path'

import { Response } from 'express'

import { errorHandling } from './fsErrorHandling'

import { Move, Delete, Download, Results, FolderData, Node } from '../global/interfaces'
import { Variables } from '../global/variables'

export class fsServices {
    public static async folderTree(projectName: string, parentNode: Node<FolderData>, depth = 1): Promise<Array<Node<FolderData>>> {
        let childNodes: Array<Node<FolderData>> = new Array<Node<FolderData>>()

        try {
            for (const file of await fs.readdir(projectName)) {
                const stats = await fs.stat(path.join(projectName, file))
                console.log(path.join(projectName, file))
                let newNode = new Node<FolderData>(
                    {
                        path: projectName,
                        name: file,
                        type: stats.isDirectory(stats) ? 'directory' : 'file',
                        depth: depth,
                    },
                    parentNode,
                )
                newNode.children = stats.isDirectory(stats) ? await fsServices.folderTree(path.join(projectName, file), newNode, depth + 1) : null
                childNodes.push(newNode)
            }
        } catch (err) {
            throw { success: false, function: this.folderTree.name, logMessage: err.message }
        }
        return childNodes
    }

    public static async getFile(path: string) {
        try {
            if (!fs.readFileSync(path)) {
                return { success: false, function: this.getFile.name, message: 'Failed reading file', logMessage: 'Failed reading file' }
            } else {
                await fs.readFileSync
            }

            const content = await fs.readFileSync(path)
            const base64 = content.toString('base64')

            return { success: true, function: this.getFile.name, data: base64, message: 'File content retrieved', logMessage: 'File content retrieved' }
        } catch (err) {
            return { success: false, function: this.getFile.name, logMessage: err.message }
        }
    }

    public static async saveFile(path: string, content: string) {
        try {
            if (!fs.existsSync(path)) {
                return { success: false, function: this.saveFile.name, message: 'File does not exist', logMessage: 'File does not exist' }
            } else {
                content = atob(content)

                await fs.writeFile(path, content)
                return { success: true, function: this.saveFile.name, message: 'File content changed', logMessage: 'File content changed' }
            }
        } catch (err) {
            const error = await errorHandling.getSpecificError(err.code)
            return { success: false, function: this.saveFile.name, message: error, logMessage: err.message }
        }
    }

    public static async addFile(path: string, name: string) {
        try {
            const allowedExtensions = Variables.allowedExtensions

            const parts = name.split('.')
            const fileExtension = parts.length > 1 ? parts.pop() : ''

            if (name.length > 15) {
                return { success: false, function: this.addFile.name, message: 'File name too long', logMessage: 'File name too long' }
            } else if (fileExtension.length === 0) {
                return { success: false, function: this.addFile.name, message: 'No file extension given', logMessage: 'No file extension given' }
            } else if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                await fs.writeFile(path + '/' + name, '')
                return { success: true, function: this.addFile.name, message: 'File created', logMessage: 'File created' }
            } else {
                return { success: false, function: this.addFile.name, message: 'Given file extension not allowed', logMessage: 'Given file extension not allowed' }
            }
        } catch (err) {
            const error = await errorHandling.getSpecificError(err.code)
            return { success: false, function: this.addFile.name, message: error, logMessage: err.message }
        }
    }

    public static async addFolder(path: string) {
        try {
            await fs.mkdir(path)
            return { success: true, function: this.addFolder.name, message: 'Folder created', logMessage: 'Folder created' }
        } catch (err) {
            const error = await errorHandling.getSpecificError(err.code)
            return { success: false, function: this.addFolder.name, message: error, logMessage: err.message }
        }
    }

    public static async Rename(oldPath: string, newName: string) {
        try {
            const allowedExtensions = Variables.allowedExtensions

            const stats = await fs.stat(oldPath)

            const newPath = path.join(path.dirname(oldPath), newName)

            if (stats.isFile()) {
                const parts = newName.split('.')
                const fileExtension = parts.length > 1 ? parts.pop() : ''

                if (newName.length > 15) {
                    return { success: false, function: this.Rename.name, message: 'New name too long', logMessage: 'New name too long' }
                } else if (fileExtension.length === 0) {
                    return { success: false, function: this.Rename.name, message: 'No file extension given', logMessage: 'No file extension given' }
                } else if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                    await fs.rename(oldPath, newPath)
                    return { success: true, function: this.Rename.name, message: 'File renamed', logMessage: 'File renamed' }
                } else {
                    return { success: false, function: this.Rename.name, message: 'File extension not allowed', logMessage: 'Given file extension not allowed' }
                }
            } else if (stats.isDirectory()) {
                if (newName.length > 15) {
                    return { success: false, function: this.Rename.name, message: 'New name too long', logMessage: 'New name too long' }
                }

                await fs.renameSync(oldPath, newPath)
                await fs.rmSync(oldPath, { recursive: true, force: true }) // check when deleting folders if necesary

                return { success: true, function: this.Rename.name, message: 'Folder renamed', logMessage: 'Folder renamed' }
            }
        } catch (err) {
            const error = await errorHandling.getSpecificError(err.code)
            return { success: false, function: this.Rename.name, message: error, logMessage: err.message }
        }
    }

    public static async Move(paths: Move[]) {
        const results: Results = {
            success: [],
            failed: [],
        }

        for (const each of paths) {
            const path: string = each.path
            const destination: string = each.destination

            try {
                fs.copy(path, destination)
                fs.rmSync(path, { recursive: true, force: true })
                results.success.push(`Succes to move: ${path} to ${destination}`)
            } catch (err) {
                const error = await errorHandling.getSpecificError(err.code)
                results.failed.push(`Failed to move: ${path} to ${destination}`)
            }
        }

        return { function: this.Move.name, message: results }
    }

    public static async Delete(paths: Delete[]) {
        const results: Results = {
            success: [],
            failed: [],
        }

        for (const each of paths) {
            try {
                fs.rmSync(each, { recursive: true, force: true })
                results.success.push(`Succes to delete: ${path}`)
            } catch (err) {
                const error = await errorHandling.getSpecificError(err.code)
                results.success.push(`Failed to delete: ${path}`)
            }
        }

        return { function: this.Delete.name, message: results }
    }

    public static async Download(paths: string[], res: Response) {
        const archive = archiver('zip', { zlib: { level: 9 } })

        res.status(200)
        res.setHeader('Content-Type', 'application/zip')
        res.setHeader('Content-Disposition', 'attachment; filename="download.zip"')

        archive.pipe(res)

        for (const filePath of paths) {
            const stats = fs.statSync(filePath)

            if (stats.isDirectory()) {
                archive.directory(filePath, path.basename(filePath))
            } else if (stats.isFile()) {
                archive.file(filePath, { name: path.basename(filePath) })
            }
        }

        await archive.finalize()
    }
}
