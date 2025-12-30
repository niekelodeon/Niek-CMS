import React, { useRef, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { connectionAtom, saveConnectionResultAtom, saveConnectionMessageAtom } from '../utils/atoms'

import type { Connection } from '../utils/interfaces'

import { settingsFunctions } from '../utils/functions/SettingsFunctions'

export default function Connection() {
    const [connection, setConnection] = useAtom(connectionAtom)
    const [saveConnectionResult, setSaveConnectionResult] = useAtom(saveConnectionResultAtom)
    const [saveConnectionMessage, setSaveConnectionMessage] = useAtom(saveConnectionMessageAtom)

    async function getConnection() {
        const getConnectionObject = await settingsFunctions.getConnection()

        setConnection(getConnectionObject)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setConnection(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    async function saveConnection(e: any) {
        e.preventDefault()

        console.log(connection)
        const saveConnectionObject = await settingsFunctions.saveConnection(connection)

        setSaveConnectionResult(saveConnectionObject.result)
        setSaveConnectionMessage(saveConnectionObject.message)
    }

    useEffect(() => {
        getConnection()
    }, [])

    return (
        <div id="container-connection" className="flex flex-col">
            <form onSubmit={saveConnection} id="container-inputs" className="flex flex-col items-center gap-[1.875rem]">
                <div id="container-input" className="flex flex-col">
                    <input
                        value={connection.name}
                        onChange={handleChange}
                        placeholder="name"
                        type="text"
                        id="name"
                        name="name"
                        className="w-[21.25rem] rounded-md border border-[#3D3A67] px-[0.8rem] py-[0.5rem] placeholder-[#868686] transition-[900ms] focus:border-[#7F7EFF] focus:outline-none"
                    />
                </div>

                <div id="container-input" className="flex flex-col">
                    <input
                        value={connection.host}
                        onChange={handleChange}
                        placeholder="host"
                        type="text"
                        id="host"
                        name="host"
                        className="w-[21.25rem] rounded-md border border-[#3D3A67] px-[0.8rem] py-[0.5rem] placeholder-[#868686] transition-[900ms] focus:border-[#7F7EFF] focus:outline-none"
                    />
                </div>

                <div id="container-input" className="flex flex-col">
                    <input
                        value={connection.port}
                        onChange={handleChange}
                        placeholder="port"
                        type="text"
                        id="port"
                        name="port"
                        className="w-[21.25rem] rounded-md border border-[#3D3A67] px-[0.8rem] py-[0.5rem] placeholder-[#868686] transition-[900ms] focus:border-[#7F7EFF] focus:outline-none"
                    />
                </div>

                <div id="container-input" className="flex flex-col">
                    <input
                        value={connection.user}
                        onChange={handleChange}
                        placeholder="user"
                        type="text"
                        id="user"
                        name="user"
                        className="w-[21.25rem] rounded-md border border-[#3D3A67] px-[0.8rem] py-[0.5rem] placeholder-[#868686] transition-[900ms] focus:border-[#7F7EFF] focus:outline-none"
                    />
                </div>

                <div id="container-input" className="flex flex-col">
                    <input
                        value={connection.password}
                        onChange={handleChange}
                        placeholder="password"
                        type="text"
                        id="password"
                        name="password"
                        className="w-[21.25rem] rounded-md border border-[#3D3A67] px-[0.8rem] py-[0.5rem] placeholder-[#868686] transition-[900ms] focus:border-[#7F7EFF] focus:outline-none"
                    />
                </div>

                <div id="container-button" className="flex w-[21.25rem] flex-col gap-[1rem] transition-all duration-[900ms]">
                    <div id="message" className={`text-sm ${saveConnectionResult ? 'text-[#4ade80]' : 'text-[#ff8082]'}`}>
                        {saveConnectionMessage}
                    </div>

                    <button type="submit" className="flex-start flex w-[21.25rem] cursor-pointer rounded-md bg-[#7F7EFF] px-[2.5rem] py-3 font-medium transition-[900ms] hover:bg-[#5D5CC9]">
                        Connect!
                    </button>
                </div>
            </form>
        </div>
    )
}
