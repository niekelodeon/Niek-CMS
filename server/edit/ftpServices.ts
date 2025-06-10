import fs from 'fs-extra'
import path from 'path'

import { Client } from "basic-ftp"
import { ftpConfig, ftpDirectories } from '../global/interfaces'

import { Results } from '../global/interfaces'
import { Variables } from '../global/variables'

export class ftpServices {

    private static client = new Client()

    public static async Structure (ftpConfig: ftpConfig) {

        const directories: ftpDirectories = {
            paths: []
        }

        try {
            await ftpServices.client.access({
                host: ftpConfig.host,
                user: ftpConfig.user,
                password: ftpConfig.password,
                port: ftpConfig.port,
                secure: true
            }) 

            const files = await ftpServices.client.list()

            for (const file of files) {
                if (file.type === 2) {
                    directories.paths.push(file.name)
                }
            }

            ftpServices.client.close()

            return { success: true, file: __filename, function: this.Structure.name, message: "Remote folder structure retrieved", result: directories }
        } catch (err) {
            return { success: false, file: __filename, function: this.Structure.name, message: err.msg }
        }
    }

    public static async downloadProject (ftpConfig: ftpConfig, remoteDir: string, localDir: string) {
        try {
            await ftpServices.client.access({
                host: ftpConfig.host,
                user: ftpConfig.user,
                password: ftpConfig.password,
                port: ftpConfig.port,
                secure: true
            })
    
            const result = await ftpServices.recursiveDownload(remoteDir, localDir)

            ftpServices.client.close()

            return { success: true, file: __filename, function: this.downloadProject.name, message: result }
        } catch (err) {
            return { success: true, file: __filename, function: this.downloadProject.name, message: err.message }
        }
    }
    
    private static async recursiveDownload (remoteDir: string, localDir: string) {

        const result: Results = {
            success: [],
            failed: []
        }

        const allowedExtensions = Variables.allowedExtensions

        const files = await ftpServices.client.list(remoteDir)
    
        for (const file of files) {
            const remoteFilePath = `${remoteDir}/${file.name}`

            const localFilePath = path.join(localDir, file.name)
    
            if (file.type === 2) {     
                await fs.mkdir(localFilePath, { recursive: true })
                
                await ftpServices.recursiveDownload(remoteFilePath, localFilePath)
            } else { 
                const filePath: string = file.name
                const fileExtension: string = filePath.slice(((filePath.lastIndexOf(".") - 1) >>> 0) + 2)

                if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                    await ftpServices.client.downloadTo(localFilePath, remoteFilePath)
                    result.success.push(`Success to download: ${filePath} to ${localDir}`)
                } else {
                    result.failed.push(`Failed to upload: ${filePath} to ${localDir}`)
                }
            }
        }

        return result
    }

    public static async publishProject (ftpConfig: ftpConfig, selectedProject: string, remoteDir: string) {
        try {
            await ftpServices.client.access({
                host: ftpConfig.host,
                user: ftpConfig.user,
                password: ftpConfig.password,
                port: ftpConfig.port,
                secure: true
            })

            ftpServices.client.uploadFromDir(selectedProject, remoteDir)
            ftpServices.client.close()
            return { success: true, file: __filename, function: this.publishProject.name, message: "Project published to remote location" }
        } catch (err) {
            return { success: false, file: __filename, function: this.publishProject.name, message: err.msg }
        }
    }

}