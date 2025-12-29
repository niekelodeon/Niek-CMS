import fs from 'fs-extra'
import archiver from 'archiver'
import path from 'path'

import { Response } from 'express'

import { errorHandling } from './fsErrorHandling'

import { Database, Queries } from '../global/database'

import { Connection, Move, Delete, Download, Results, FolderData, Node } from '../global/interfaces'
import { Variables } from '../global/variables'
import { StringMappingType } from 'typescript'

export class settingsServices {
    public static async getConnection (id: number) {
        try {
            const connection: Connection = await Queries.getConnection(id)

            return { success: true, function: this.getConnection.name, data: connection, message: 'Connection data retrieved', logMessage: 'Connection data retrieved' }
        } catch (err) {
            return { success: false, function: this.getConnection.name, logMessage: err.message }
        }
    }

    public static async saveConnection (id: number, name: string, host: string, port: string, user: string, password: string) {
        try {
            const connection: Connection = await Queries.saveConnection(id, name, host, port, user, password)

            console.log(id, name, host, port, user, password)

            if (!connection) {
                return { success: false, function: this.saveConnection.name, message: 'Failed to update connection data', logMessage: 'Failed to update connection data' }
            } else {
                return { success: true, function: this.saveConnection.name, message: 'Connection data updated', logMessage: 'Connection data updated' }
            }
        } catch (err) {
            return { success: false, function: this.saveConnection.name, message: 'Failed to update connection data',  logMessage: err.message }
        }
    }

}