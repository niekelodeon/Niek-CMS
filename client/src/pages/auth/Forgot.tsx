import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { type ForgotResponse } from '../../utils/interfaces'

import { authAPI } from '../../utils/API'

import Spline from '@splinetool/react-spline'

export default function Forgot() {
    const navigate = useNavigate() // navigate to login?

    const [email, setEmail] = useState<string>()

    const [success, setSuccess] = useState<boolean>(false)
    const [forgotMessage, setForgotMessage] = useState<string>()

    async function forgot(e: any) {
        e.preventDefault()

        const forgotObject: ForgotResponse = await authAPI.Forgot(email)
        setSuccess(forgotObject.result)
        setForgotMessage(forgotObject.message)
    }

    return (
        <div id="container-page" className="flex w-screen h-screen bg-[linear-gradient(-45deg,#7F7EFF_30%,#1B1E24_40%)] items-center justify-center">
            <div id="container-forgot" className="flex flex-row h-[80%] w-[70%] mx-[5%] bg-[#272334] rounded-3xl">
                <div id="container-left" className="flex flex-col w-1/2 my-[10%] m-[5%] items-center gap-[15%]">
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
                                className="w-[21.25rem] px-[0.8rem] py-[0.5rem] placeholder-[#868686] border-[#3D3A67] border rounded-md transition-[900ms] focus:border-[#EDC79B] focus:outline-none"
                            />
                        </div>

                        <div id="container-button" className="flex flex-col w-[21.25rem] transition-all gap-[1rem] duration-[900ms]">
                            {success ? (
                                <div id="message" className="text-sm text-[#63ff80]">
                                    {forgotMessage}
                                </div>
                            ) : (
                                <div id="message" className="text-sm text-[#ff808a]">
                                    {forgotMessage}
                                </div>
                            )}

                            <button type="submit" className="flex flex-start w-[21.25rem] px-[2.5rem] py-3 font-medium bg-[#7F7EFF] rounded-md transition-[900ms] cursor-pointer hover:bg-[#5D5CC9]">
                                Send!
                            </button>
                        </div>
                    </form>
                </div>

                <div id="container-right" className="flex w-1/2 my-[5%] mx-[5%] justify-center">
                    <div id="container-image" className="h-full w-full rounded-3xl">
                        <Spline scene="https://prod.spline.design/SSrk4wMwV7g-0eW6/scene.splinecode" />
                    </div>
                </div>
            </div>
        </div>
    )
}
