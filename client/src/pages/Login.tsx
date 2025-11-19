import React, { useRef, useEffect, useState } from 'react'

import { authAPI } from '../utils/API'

export default function Login() {
    const [showPassword, setShowPassword] = useState<boolean>()

    function toggleShowPassword() {
        setShowPassword(prev => !prev)
    }

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    async function login(e: any) {
        e.preventDefault()
        console.log(email, password)

        const login: string = await authAPI.Login(email, password)
    }

    return (
        <div id="container-page" className="w-screen h-screen bg-[linear-gradient(-45deg,#7F7EFF_30%,#1B1E24_40%)] flex items-center justify-center">
            <div id="container-login" className="flex flex-row h-[80%] w-[70%] bg-[#272334] mx-[5%] rounded-3xl">
                <div id="container-left" className="w-1/2 flex flex-col items-center my-[10%] gap-[20%] m-[5%]">
                    <h1 id="header-login" className="text-2xl font-medium text-[#7F7EFF]">
                        Login
                    </h1>

                    <form onSubmit={login} id="container-inputs" className="flex flex-col items-center gap-[1.875rem]">
                        <div id="container-input" className="flex flex-col">
                            <input
                                onChange={e => setEmail(e.target.value)}
                                className="w-[21.25rem] px-[0.8rem] py-[0.5rem] placeholder-[#868686] border-[#3D3A67] focus:border-[#EDC79B] focus:outline-none border rounded-md transition-[900ms]"
                                placeholder="email"
                                type="text"
                                id="username"
                                name="username"
                            />
                        </div>

                        <div id="container-input" className="relative flex flex-col gap-[0.6rem]">
                            <div id="container-password" className="flex flex-row">
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-[21.25rem] px-[0.8rem] py-[0.5rem] placeholder-[#868686] border-[#3D3A67] focus:border-[#EDC79B] focus:outline-none border rounded-md transition-[900ms]"
                                    placeholder="password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                />

                                <div id="container-showPassword" className="absolute right-[1rem] top-[0.7rem] cursor-pointer">
                                    {showPassword ? (
                                        <svg onClick={toggleShowPassword} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_273_61)">
                                                <path
                                                    d="M0.833313 9.99998C0.833313 9.99998 4.16665 3.33331 9.99998 3.33331C15.8333 3.33331 19.1666 9.99998 19.1666 9.99998C19.1666 9.99998 15.8333 16.6666 9.99998 16.6666C4.16665 16.6666 0.833313 9.99998 0.833313 9.99998Z"
                                                    stroke="#7F7EFF"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                                                    stroke="#7F7EFF"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_273_61">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    ) : (
                                        <svg onClick={toggleShowPassword} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_273_65)">
                                                <path
                                                    d="M14.95 14.95C13.5255 16.0358 11.7909 16.6374 9.99998 16.6667C4.16665 16.6667 0.833313 10 0.833313 10C1.86989 8.06825 3.30759 6.38051 5.04998 5.05M8.24998 3.53333C8.82359 3.39907 9.41087 3.33195 9.99998 3.33333C15.8333 3.33333 19.1666 10 19.1666 10C18.6608 10.9463 18.0575 11.8373 17.3666 12.6583M11.7666 11.7667C11.5378 12.0123 11.2618 12.2093 10.9551 12.3459C10.6484 12.4826 10.3174 12.556 9.98172 12.562C9.64605 12.5679 9.31262 12.5061 9.00132 12.3804C8.69003 12.2547 8.40725 12.0675 8.16985 11.8301C7.93246 11.5927 7.74531 11.31 7.61957 10.9987C7.49383 10.6874 7.43209 10.3539 7.43801 10.0183C7.44393 9.68258 7.5174 9.35154 7.65404 9.04487C7.79068 8.73821 7.98769 8.46221 8.23331 8.23333"
                                                    stroke="#7F7EFF"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path d="M0.833313 0.833313L19.1666 19.1666" stroke="#7F7EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_273_65">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <div id="container-links" className="flex justify-between">
                                <a className="text-sm text-[#868686] hover:text-[#EDC79B] transition-[900ms]" href="#">
                                    register
                                </a>
                                <a className="text-sm text-[#868686] hover:text-[#EDC79B] transition-[900ms]" href="#">
                                    forgot password?
                                </a>
                            </div>
                        </div>

                        <button className="flex flex-start px-[2.5rem] w-[21.25rem] rounded-md py-3 bg-[#7F7EFF] hover:bg-[#5D5CC9] font-medium transition-[900ms] cursor-pointer" type="submit">
                            Go!
                        </button>
                    </form>
                </div>

                <div id="container-right" className="w-1/2 flex justify-center my-[5%] mx-[5%]">
                    <div id="container-image" className="h-full w-full bg-[#7F7EFF] rounded-3xl"></div>
                </div>
            </div>
        </div>
    )
}
