import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { type RegisterResponse } from '../../utils/interfaces'

import { authAPI } from '../../utils/API'

import Spline from '@splinetool/react-spline'

export default function Register() {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState<boolean>()

    function toggleShowPassword() {
        setShowPassword(prev => !prev)
    }

    const [email, setEmail] = useState<string>()

    const [password, setPassword] = useState<string>()
    const [comparePassword, setComparePassword] = useState<string>()

    const [registerMessage, setRegisterMessage] = useState<string>()

    function comparePasswords(e: any) {
        if (password != comparePassword) setRegisterMessage("Passwords don't match")
        else setPassword(password)
    }

    async function register(e: any) {
        e.preventDefault()

        if (password != comparePassword) {
            setRegisterMessage("Passwords don't match")
        } else {
            setPassword(password)

            const registerObject: RegisterResponse = await authAPI.Register(email, password)

            if (registerObject.result) {
                document.cookie = `token=${registerObject.token}; path=/; max-age=86400; SameSite=Lax`
                navigate('/login')
            } else {
                setRegisterMessage(registerObject.message)
            }
        }
    }

    return (
        <div id="container-page" className="flex w-screen h-screen bg-[linear-gradient(-45deg,#7F7EFF_30%,#1B1E24_40%)] items-center justify-center">
            <div id="container-register" className="flex flex-row h-[80%] w-[70%] mx-[5%] bg-[#272334] rounded-3xl">
                <div id="container-left" className="flex flex-col w-1/2 my-[10%] m-[5%] items-center gap-[15%]">
                    <h1 id="header-register" className="text-2xl font-medium text-[#7F7EFF]">
                        Register
                    </h1>

                    <form onSubmit={register} id="container-inputs" className="flex flex-col items-center gap-[1.875rem]">
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

                        <div id="container-input" className="flex flex-col relative gap-[0.6rem]">
                            <div id="container-passwords" className="flex flex-col gap-[1.875rem]">
                                <div id="container-password" className="relative flex flex-row">
                                    <input
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        className="w-[21.25rem] px-[0.8rem] py-[0.5rem] placeholder-[#868686] border-[#3D3A67] border rounded-md transition-[900ms] focus:border-[#EDC79B] focus:outline-none"
                                    />
                                    <div id="container-showPassword" className="cursor-pointer absolute right-[1rem] top-[0.7rem]">
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
                                <div id="container-password" className="relative flex flex-row">
                                    <input
                                        onChange={e => setComparePassword(e.target.value)}
                                        placeholder="confirm password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        className="w-[21.25rem] px-[0.8rem] py-[0.5rem] placeholder-[#868686] border-[#3D3A67] border rounded-md transition-[900ms] focus:border-[#EDC79B] focus:outline-none"
                                    />
                                    <div id="container-showPassword" className="cursor-pointer absolute right-[1rem] top-[0.7rem]">
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
                            </div>
                            <div id="container-links" className="flex justify-between">
                                <a href="#" className="text-sm text-[#868686] transition-[900ms] hover:text-[#EDC79B]">
                                    login
                                </a>
                                <a href="#" className="text-sm text-[#868686] transition-[900ms] hover:text-[#EDC79B]">
                                    forgot password?
                                </a>
                            </div>
                        </div>

                        <div id="container-button" className="flex flex-col transition-all gap-[1rem] duration-[900ms]">
                            <div id="message" className="text-sm text-[#ff8082]">
                                {registerMessage}
                            </div>

                            <button type="submit" className="flex flex-start w-[21.25rem] px-[2.5rem] py-3 font-medium bg-[#7F7EFF] rounded-md transition-[900ms] cursor-pointer hover:bg-[#5D5CC9]">
                                Register!
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
