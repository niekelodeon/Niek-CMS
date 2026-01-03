import React, { useRef, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { connectionAtom, checkConnectionResultAtom, checkConnectionMessageAtom } from '../utils/atoms'

import type { Connection } from '../utils/interfaces'

import { settingsFunctions } from '../utils/functions/SettingsFunctions'

export default function RemoteStructure() {
    const [checkConnectionResult, setCheckConnectionResult] = useAtom(checkConnectionResultAtom)
    const [checkConnectionMessage, setCheckConnectionMessage] = useAtom(checkConnectionMessageAtom)

    async function checkConnection(e: any) {
        e.preventDefault()

        const checkConnectionObject = await settingsFunctions.checkConnection()

        setCheckConnectionResult(checkConnectionObject.result)
        setCheckConnectionMessage(checkConnectionObject.message)
    }

    // it's probably better to click on fetchRemoteStructure then users can see if the connection is correct or not without needing a extra button.

    return (
        <div id="container-button" className="flex w-[21.25rem] flex-col gap-[1rem] transition-all duration-[900ms]">
            <form onSubmit={checkConnection} id="container-inputs" className="flex flex-col items-center gap-[1.875rem]">
                <button type="submit" className="flex-start flex w-[21.25rem] cursor-pointer rounded-md bg-[#7F7EFF] px-[2.5rem] py-3 font-medium transition-[900ms] hover:bg-[#5D5CC9]">
                    Test Connection!
                </button>

                <div id="message" className={`text-sm ${checkConnectionResult ? 'text-[#4ade80]' : 'text-[#ff8082]'}`}>
                    {checkConnectionMessage}
                </div>
            </form>

            <div className="container-selectRemoteStructure"></div>
        </div>
    )
}
