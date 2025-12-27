import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { type ResetResponse } from '../../utils/interfaces'

import { authAPI } from '../../utils/API'

import Spline from '@splinetool/react-spline'

export default function Forgot() {
    const navigate = useNavigate() // navigate to login?

    const [email, setEmail] = useState<string>()

    const [success, setSuccess] = useState<boolean>(false)
    const [forgotMessage, setForgotMessage] = useState<string>()

    async function forgot(e: any) {
        e.preventDefault()

        const forgotObject: ResetResponse = await authAPI.Forgot(email)
        setSuccess(forgotObject.result)
        setForgotMessage(forgotObject.message)
    }

    return (
        <div id="container-page" className="flex h-screen w-screen items-center justify-center bg-[linear-gradient(-45deg,#7F7EFF_30%,#1B1E24_40%)]">
            <div id="container-forgot" className="mx-[5%] flex h-[80%] w-[70%] flex-row rounded-3xl bg-[#272334]">
                <div id="container-left" className="m-[5%] my-[10%] flex w-1/2 flex-col items-center gap-[15%]">
                    <h1 id="header-forgot" className="text-2xl font-medium text-[#7F7EFF]">
                        Forgot
                    </h1>

                    <form onSubmit={forgot} id="container-inputs" className="flex flex-col items-center gap-[1.875rem]">
                        <div id="container-input" className="flex flex-col">
                            <input
                                onChange={e => setEmail(e.target.value)}
                                placeholder="email"
                                type="text"
                                id="username"
                                name="username"
                                className="w-[21.25rem] rounded-md border border-[#3D3A67] px-[0.8rem] py-[0.5rem] placeholder-[#868686] transition-[900ms] focus:border-[#EDC79B] focus:outline-none"
                            />
                        </div>

                        <div id="container-button" className="flex w-[21.25rem] flex-col gap-[1rem] transition-all duration-[900ms]">
                            {success ? (
                                <div id="message" className="text-sm text-[#63ff80]">
                                    {forgotMessage}
                                </div>
                            ) : (
                                <div id="message" className="text-sm text-[#ff808a]">
                                    {forgotMessage}
                                </div>
                            )}

                            <button type="submit" className="flex-start flex w-[21.25rem] cursor-pointer rounded-md bg-[#7F7EFF] px-[2.5rem] py-3 font-medium transition-[900ms] hover:bg-[#5D5CC9]">
                                Send!
                            </button>
                        </div>
                    </form>
                </div>

                <div id="container-right" className="mx-[5%] my-[5%] flex w-1/2 justify-center">
                    <div id="container-image" className="h-full w-full rounded-3xl">
                        <Spline scene="https://prod.spline.design/SSrk4wMwV7g-0eW6/scene.splinecode" />
                    </div>
                </div>
            </div>
        </div>
    )
}
