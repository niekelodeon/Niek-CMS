import multer from 'multer'
import unzipper from 'unzipper'
import fs from 'fs-extra'
import path from 'path'

import { Readable } from 'stream'

import { Results, UploadResults } from '../global/interfaces'
import { Variables } from '../global/variables'

class FileError {
    name: string
    message: string
    
    constructor(name: string, message: string) {
        this.name = name
        this.message = message
    }

    toString() {
        return `${this.name}: ${this.message}`
    }
}

export class UploadServices {
    public static Filter () {

        return multer({
            storage: multer.memoryStorage(),
            limits: { fileSize: 200 * 1024 * 1024 }, // first number = megabytes
            fileFilter: (req, file, callback) => {
                const filetypes = /zip/
                
                const mimetype = filetypes.test(file.mimetype)
                const extname = filetypes.test(file.originalname.toLowerCase().split('.').pop())
                
                if (mimetype && extname) {
                    return callback(null, true)
                } else {
                    return callback(new FileError('FileError', 'Only .zip files are allowed'))
                }
            }
        })
    }

    public static async uploadStream (unfilteredBuffer: any, localDir: string): Promise<UploadResults> {

        const result: Results = {
            success: [],
            failed: []
        }

        const allowedExtensions = Variables.allowedExtensions

        const folderName: string = localDir.replace(/\.zip$/, "")
                
        const readableStream = new Readable()
        const zipBuffer = Buffer.from(unfilteredBuffer)
                
        readableStream.push(zipBuffer)
        readableStream.push(null)
                    
        try {
            return new Promise ((resolve, reject) => {
                readableStream
                .pipe(unzipper.Parse())
                .on('entry', entry => {
    
                    const filePath: string = entry.path
                    const fileExtension: string = filePath.slice(((filePath.lastIndexOf(".") - 1) >>> 0) + 2)
                    const outputFilePath: string = path.join(folderName, filePath)
                        
                    if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                        
                        const dir: string = path.dirname(outputFilePath)
                        fs.mkdirSync(dir, { recursive: true })
                        
                        const writeStream = fs.createWriteStream(outputFilePath)
                        entry.pipe(writeStream)
                        
                        writeStream.on('finish', () => {
                            // console.log(`Filtered file extracted to ${outputFilePath}`) 
                        })
                        result.success.push(`Success to upload: ${filePath} to ${outputFilePath}`)
                    } else {
                        result.failed.push(`Failed to upload: ${filePath} to ${outputFilePath}`)
                        entry.autodrain()
                    }
                })
                .on('close', () => {
                    resolve({ success: true, file: __filename, func: this.uploadStream.name, message: result })
                })
                .on('error', (err) => {
                    reject({ success: true, file: __filename, func: this.uploadStream.name, message: err.message })
                })
            })
        } catch (err) {
            return { success: true, file: __filename, func: this.uploadStream.name, message: err.message }
        }
        
    }
}
