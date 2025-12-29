import { getDefaultStore } from 'jotai'

import { currentNodeAtom, resultMessageAtom } from '../atoms'

import { settingsAPI } from '../API'

import type { Connection, GetConnectionResponse, SaveConnectionResponse } from '../interfaces'

// use different casing in class names
export class settingsFunctions {
    public static async getConnection(): Promise<Connection> {
        try {
            const getConnectionObject: GetConnectionResponse = await settingsAPI.getConnection()

            return getConnectionObject.data
        } catch (err) {
            // set error message here to a atomc
            return err
        }
    }

    // Unfinished, type of getConnectionResponse for now, should be "saveConnectionResponse" but don't know what type response it will give yet. result & message probably.
    public static async saveConnection(connection: Connection): Promise<SaveConnectionResponse> {
        try {
            const saveConnectionObject: SaveConnectionResponse = await settingsAPI.saveConnection(connection)

            return saveConnectionObject
        } catch (err) {
            // set error message here to a atom
            return err
        }
    }
}
