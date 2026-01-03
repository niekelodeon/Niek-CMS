import React, { useRef, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { connectionAtom, checkConnectionResultAtom, checkConnectionMessageAtom } from '../utils/atoms'

import type { Connection } from '../utils/interfaces'

import { settingsFunctions } from '../utils/functions/SettingsFunctions'

export default function RemoteStructure() {
    const [checkConnectionResult, setCheckConnectionResult] = useAtom(checkConnectionResultAtom)
    const [checkConnectionMessage, setCheckConnectionMessage] = useAtom(checkConnectionMessageAtom)

    async function checkConnection() {
        const checkConnectionObject = await settingsFunctions.checkConnection()

        setCheckConnectionResult(checkConnectionObject.result)
        setCheckConnectionMessage(checkConnectionObject.message)
    }
}
