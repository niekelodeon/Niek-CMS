import { getDefaultStore } from 'jotai'

import { currentNodeAtom, resultMessageAtom } from '../atoms'

import { settingsAPI } from '../API'

import type { Connection, GetConnectionResponse } from '../interfaces'

// use different casing in class names
export class settingsFunctions {
    public static async getConnection(): Promise<Connection> {
        try {
            const getConnectionObject: GetConnectionResponse = await settingsAPI.getConnection()

            return getConnectionObject.data
        } catch (err) {
            // set error message here to a atom
            return err
        }
    }
}
