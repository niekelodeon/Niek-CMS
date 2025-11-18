export default function Login() {
    return (
        <div id="container-page" className="w-full">
            <div id="container-login" className="flex flex-row bg-[#272334] my-[3%] mx-[5%] rounded-3xl">
                <div id="container-left" className="w-1/2 flex flex-col items-center gap-[6.25rem] m-[5%]">
                    <h1 id="header-login" className="text-2xl font-medium text-[#7F7EFF]">
                        Login
                    </h1>

                    <form id="container-inputs" className="flex flex-col items-center gap-[1.875rem]">
                        <div id="container-input" className="flex flex-col">
                            <input
                                className="w-[21.25rem] px-[0.8rem] py-[0.5rem] placeholder-[#868686] border-[#3D3A67] focus:border-[#EDC79B] focus:outline-none border rounded-md transition-[900ms]"
                                placeholder="email"
                                type="text"
                                id="username"
                                name="username"
                            />
                        </div>

                        <div id="container-input" className="flex flex-col gap-[0.6rem]">
                            <div className="container-password">
                                <input
                                    className="w-[21.25rem] px-[0.8rem] py-[0.5rem] placeholder-[#868686] border-[#3D3A67] focus:border-[#EDC79B] focus:outline-none border rounded-md transition-[900ms]"
                                    placeholder="password"
                                    type="password"
                                    id="password"
                                    name="password"
                                />
                            </div>
                            <a className="flex justify-end text-sm text-[#868686] hover:text-[#EDC79B] transition-[900ms]" href="#">
                                forgot password?
                            </a>
                        </div>

                        <button className="flex flex-start px-[2.5rem] w-[21.25rem] rounded-md py-3 bg-[#7F7EFF] hover:bg-[#5D5CC9] transition-[900ms]" typeof="submit">
                            Go!
                        </button>
                    </form>
                </div>
                <div id="container-right" className="w-1/2 flex justify-center my-[3%] mx-[3%]">
                    <svg width="550" height="700" viewBox="0 0 550 700" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="550" height="700" rx="25" fill="#7F7EFF" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
