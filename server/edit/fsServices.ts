import fs from 'fs-extra'
import archiver from 'archiver'
import path from 'path'

import { Response } from 'express'

import { errorHandling } from './fsErrorHandling'
import { UploadServices } from './uploadServices'

import { Move, Delete, Download, Results } from '../global/interfaces'
import { Variables } from '../global/variables'

export class fsServices {

    public static async Save (path: string, content: string) {
        try {
            if (!fs.existsSync(path)) {
                return { success: false, file: __filename, function: this.Save.name, message: "File does not exist", logMessage: "File does not exist" }
            } else {
                await fs.writeFile(path, content)
                return { success: true, file: __filename, function: this.Save.name, message: "File content changed", logMessage: "File content changed" }
            }
        } catch (err) {
            const error = await errorHandling.getSpecificError(err.code)
            return { success: false, file: __filename, function: this.Save.name, message: error, logMessage: err }
        }
    }

    public static async addFile (path: string, name: string) {
        try {
            const allowedExtensions = Variables.allowedExtensions

            const parts = name.split('.')
            const fileExtension = parts.length > 1 ? parts.pop() : ''

            if (name.length > 15) {
                return { success: false, file: __filename, function: this.addFile.name, message: "File name too long", logMessage: "File name too long" }
            } else if (fileExtension.length === 0) {
                return { success: false, file: __filename, function: this.addFile.name, message: "No file extension given", logMessage: "No file extension given" }
            } else if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                await fs.writeFile(path + name, "")
                return { success: true, file: __filename, function: this.addFile.name, message: "File created", logMessage: "File created" }
            } else {
                return { success: false, file: __filename, function: this.addFile.name, message: "Given file extension not allowed", logMessage: "Given file extension not allowed" }
            }
        } catch (err) {
            const error = await errorHandling.getSpecificError(err.code)
            return { success: false, file: __filename, function: this.addFile.name, message: error, logMessage: err }
        }
    }

    public static async addFolder (path: string) {
        try {
            await fs.mkdir(path)
            return { success: true, file: __filename, function: this.addFolder.name, message: "Folder created", logMessage: "Folder created" }
        } catch (err) {
            const error = await errorHandling.getSpecificError(err.code)
            return { success: false, file: __filename, function: this.addFolder.name, message: error, logMessage: err }
        }
    }
    
    public static async Rename (path: string, newName: string) {
        try {
            const allowedExtensions = Variables.allowedExtensions

            const stats = await fs.stat(path)

            if (stats.isFile()) {
                const parts = newName.split('.')
                const fileExtension = parts.length > 1 ? parts.pop() : ''

                if (newName.length > 15) {
                    return { success: false, file: __filename, function: this.Rename.name, message: "New name too long", logMessage: "New name too long" }
                } else if (fileExtension.length === 0) {
                    return { success: false, file: __filename, function: this.Rename.name, message: "No file extension given", logMessage: "No file extension given" }
                } else if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                    await fs.renameSync(path, newName)
                    return { success: true, file: __filename, function: this.Rename.name, message: "File renamed", logMessage: "File renamed" }
                } else {
                    return { success: false, file: __filename, function: this.Rename.name, message: "Given file extension not allowed", logMessage: "Given file extension not allowed" }
                }
            } else if (stats.isDirectory()) {
                if (newName.length > 15) {
                    return { success: false, file: __filename, function: this.Rename.name, message: "New name too long", logMessage: "New name too long" }
                } 

                await fs.renameSync(path, newName)
                await fs.rmSync(path, { recursive: true, force: true })

                return { success: true, file: __filename, function: this.Rename.name, message: "Folder renamed", logMessage: "Folder renamed" }        
            } 
        } catch (err) {
            const error = await errorHandling.getSpecificError(err.code)
            return { success: false, file: __filename, function: this.Rename.name, message: error, logMessage: err }
        }
    }

    public static async Move (paths: Move []) {

        const results: Results = {
            success: [],
            failed: []
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
        
        return { file: __filename, function: this.Move.name, message: results }
    }

    public static async Delete (paths: Delete []) {
        
        const results: Results = {
            success: [],
            failed: []
        }

        for (const each of paths) {
            const path: string = each.path
            
            try {
                fs.rmSync(path, { recursive: true, force: true })
                results.success.push(`Succes to delete: ${path}`)
            } catch (err) {
                const error = await errorHandling.getSpecificError(err.code)
                results.success.push(`Failed to delete: ${path}`)
            }
        }

        return { file: __filename, function: this.Delete.name, message: results }
    }

    public static async Download (paths: Download [], res: Response) {

        const results: Results = {
            success: [],
            failed: []
        }

        const archive = archiver('zip', { zlib: { level: 9 } })
    
        res.attachment('download.zip') 

        archive.pipe(res)
    
        for (const each of paths) {
            const filePath = each.path
    
            try {
                if (!fs.existsSync(filePath)) throw new Error(`Path does not exist: ${filePath}`)
    
                const stats = fs.statSync(filePath)
    
                if (stats.isDirectory()) {
                    archive.directory(filePath, path.basename(filePath))
                    results.success.push(`Success to download: ${filePath}`)
                } else if (stats.isFile()) {
                    archive.file(filePath, { name: path.basename(filePath) })
                    results.success.push(`Success to download: ${filePath}`)
                } 
            } catch (err) {
                results.failed.push(`Failed to download: ${path}`)
            }
        }

        await archive.finalize()

        return { file: __filename, function: this.Delete.name, message: results }
    }

}
