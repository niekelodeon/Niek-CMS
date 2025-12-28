import fs from 'fs-extra'
import archiver from 'archiver'
import path from 'path'

import { Response } from 'express'

import { errorHandling } from './fsErrorHandling'

import { Move, Delete, Download, Results } from '../global/interfaces'
import { Variables } from '../global/variables'

export class dashboardServices {

    // public static async FolderStructure (projectPath: string, depth = 0) {

    //     let folderStructure = []
        
    //     try {

    //         const files = await fs.readdir(projectPath)

    //         for (const file of files) {
    //             const filePath: string = path.join(projectPath, file)
    //             const stats = await fs.stat(filePath) 
                
    //             if (stats.isDirectory(stats)) {
    //                 folderStructure.push({
    //                     path: filePath,
    //                     name: file,
    //                     type: "directory",
    //                     depth: depth,
    //                     children: await dashboardServices.FolderStructure(filePath, depth + 1)
    //                 })
    //             } else {
    //                 folderStructure.push({
    //                     path: filePath,
    //                     name: file,
    //                     type: "file",
    //                     depth: depth,
    //                     children: null
    //                 })
    //             }
    //         }
    //     } catch (err) {
    //         return { success: false, function: this.FolderStructure.name, logMessage: err.message }
    //     }

    //     return folderStructure
    // }

    // public static async printStructure(structure: any[], indent = 0) {
    //     for (const item of structure) {
    //         const spacing = ' '.repeat(indent * 2);
    //         const typeIcon = item.type === 'directory' ? '📁' : '📄';
            
    //         console.log(`${spacing}${typeIcon} ${item.name} (depth: ${item.depth})`);
            
    //         if (item.children && item.children.length > 0) {
    //             await dashboardServices.printStructure(item.children, indent + 1);
    //         }
    //     }
    // }   
}
