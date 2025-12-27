import React, { useRef, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { connectionAtom } from '../utils/atoms'

import type { Connection } from '../utils/interfaces'

export default function Connections() {
    // Turn into atoms:
    const [connection, setConnection] = useAtom(connectionAtom)

    // fetch the the connection first, if null just show empty on saving the connection, run backend function.

    return (
        <div id="container-connection" className="flex flex-col">
            <input
                // value={connection.name}
                placeholder="connection name"
                type="text"
                id="connection name"
                name="connection name"
                className="w-full rounded-md border border-[#3D3A67] px-[0.8rem] py-[0.5rem] placeholder-[#868686] transition-[900ms] focus:border-[#7F7EFF] focus:outline-none"
            />
        </div>
    )
}
