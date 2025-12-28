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
    // id should be retrieved through middleware
    public static async getConnection (id: number) {
        try {
            const connection: Connection = await Queries.getConnection(id)

            return { success: true, function: this.getConnection.name, data: connection, message: 'Connection data retrieved', logMessage: 'Connection data retrieved' }
        } catch (err) {
            return { success: false, function: this.getConnection.name, logMessage: err.message }
        }
    }

    // id should be retrieved through middleware
    public static async createConnection (id: number, name: string, host: string, port: number, user: string, password: string) {
        try {
            const connection: Connection = await Queries.createConnection(id, name, host, port, user, password)

            return { success: true, function: this.createConnection.name, data: connection, message: 'Connection data updated', logMessage: 'Connection data updated' }
        } catch (err) {
            return { success: false, function: this.createConnection.name, logMessage: err.message }
        }
    }

}