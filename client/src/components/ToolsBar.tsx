import React, { useRef, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { Actions } from '../utils/interfaces'

import type { FolderData, EditAPIResponse, RenameResponse, GetFileResponse, Move, MoveResponse, Delete, DeleteResponse, DownloadResponse } from '../utils/interfaces'

import { projectNameAtom, folderTreeAtom, currentPathAtom, currentNodeAtom, fileContentAtom, isOnFileAtom, currentActionAtom, selectedPathsAtom, setIsSelectingAtom, resultMessageAtom } from '../utils/atoms'

import { FolderTreeTools } from '../utils/functions/TreeFunctions'

export default function ToolsBar() {
    const [projectName, setProjectName] = useAtom(projectNameAtom)

    const [folderTree, setFolderTree] = useAtom(folderTreeAtom)

    const [currentNode, setCurrentNode] = useAtom(currentNodeAtom)
    const [currentPath, setCurrentPath] = useAtom(currentPathAtom)

    const [fileContent, setFileContent] = useAtom(fileContentAtom)

    const [isOnFile, setIsOnFile] = useAtom(isOnFileAtom)

    const [currentAction, setCurrentAction] = useAtom(currentActionAtom)

    const [isSelecting, setIsSelecting] = useAtom(setIsSelectingAtom)
    const [selectedPaths, setSelectedPaths] = useAtom(selectedPathsAtom)

    const [resultMessage, setResultMessage] = useAtom(resultMessageAtom)

    const [isRenaming, setIsRenaming] = useState<boolean>(false)
    const [isAdding, setIsAdding] = useState<boolean>(false)

    const [inputValue, setInputValue] = useState<string>()

    function setAction(action: Actions | null) {
        if (currentAction === action) {
            setCurrentAction(null)
            setIsSelecting(false)
            setIsRenaming(false)
            setIsAdding(false)
            return
        }

        const isInputAction = action === Actions.RENAME || action === Actions.ADDFILE || action === Actions.ADDFOLDER

        setIsRenaming(action === Actions.RENAME)
        setIsAdding(action === Actions.ADDFILE || action === Actions.ADDFOLDER)
        setIsSelecting(!isInputAction)

        setCurrentAction(action)
    }

    async function handleAction(action: Actions) {
        if (action === Actions.RENAME) await FolderTreeTools.Rename(currentPath, inputValue, currentNode, setCurrentNode, setCurrentPath)
        if (action === Actions.DOWNLOAD) FolderTreeTools.Download(selectedPaths)
        if (action === Actions.DELETE) FolderTreeTools.Delete(selectedPaths, projectName, setFolderTree)

        if (action === Actions.ADDFILE) FolderTreeTools.addFile(currentPath, inputValue, currentNode, setCurrentNode, setCurrentPath, setIsOnFile)
        if (action === Actions.ADDFOLDER) FolderTreeTools.addFolder(currentPath, inputValue, currentNode, setCurrentNode, setCurrentPath, setIsOnFile)
        // if (action === Actions.UPLOAD) FolderTreeTools.Upload(File)

        resetTools()
    }

    function resetTools() {
        setCurrentAction(null)
        setIsSelecting(false)
        setIsRenaming(false)
        setIsAdding(false)
        setSelectedPaths([])
        setInputValue('')
    }

    return (
        <div id="container" className="flex flex-col gap-[1.25rem]">
            <div id="container-tools" className="flex gap-[1rem]">
                <div id="tools-file" className={`flex gap-[0.5rem] transition-opacity ${isOnFile === null ? 'cursor-default opacity-40' : 'cursor-pointer opacity-100'}`}>
                    <svg
                        id="rename"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`cursor-pointer transition-colors ${currentAction === Actions.RENAME ? 'text-[#7F7EFF]' : 'text-white'} hover:text-[#7F7EFF]`}
                        onClick={isOnFile !== null ? () => setAction(Actions.RENAME) : null}
                    >
                        <path
                            d="M4 16V20L8 20L18.8686 9.13134C19.2646 8.73532 19.4627 8.53728 19.5369 8.30895C19.6021 8.10811 19.6021 7.89184 19.5369 7.691C19.4627 7.46267 19.2646 7.26462 18.8686 6.8686L17.1313 5.13134L17.1307 5.13067C16.7351 4.7351 16.5373 4.53727 16.3091 4.46313C16.1082 4.39787 15.8919 4.39787 15.691 4.46313C15.4627 4.53732 15.2646 4.73532 14.8686 5.13134L4 16Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        id="download"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`cursor-pointer transition-colors ${currentAction === Actions.DOWNLOAD ? 'text-[#7F7EFF]' : 'text-white'} hover:text-[#7F7EFF]`}
                        onClick={isOnFile !== null ? () => setAction(Actions.DOWNLOAD) : null}
                    >
                        <path
                            d="M12 10L12 16M12 16L15 14M12 16L9 14M3 6V16.8C3 17.9201 3 18.4801 3.21799 18.908C3.40973 19.2843 3.71547 19.5902 4.0918 19.782C4.51962 20 5.08009 20 6.2002 20H17.8002C18.9203 20 19.48 20 19.9078 19.782C20.2841 19.5902 20.5905 19.2843 20.7822 18.908C21.0002 18.4801 21.0002 17.9201 21.0002 16.8L21.0002 9.20002C21.0002 8.07992 21.0002 7.51986 20.7822 7.09204C20.5905 6.71572 20.2841 6.40973 19.9078 6.21799C19.48 6 18.9201 6 17.8 6H3ZM3 6C3 4.89543 3.89543 4 5 4H8.67452C9.1637 4 9.40858 4 9.63875 4.05526C9.84282 4.10425 10.0379 4.18508 10.2168 4.29474C10.4186 4.41842 10.5916 4.59135 10.9375 4.93726L12.0002 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        id="delete"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`cursor-pointer transition-colors ${currentAction === Actions.DELETE ? 'text-[#7F7EFF]' : 'text-white'} hover:text-[#7F7EFF]`}
                        onClick={isOnFile !== null ? () => setAction(Actions.DELETE) : null}
                    >
                        <path
                            d="M14 10V17M10 10L10 17M4 6H20M18 6V17.8C18 18.9201 18.0002 19.4802 17.7822 19.908C17.5905 20.2844 17.2841 20.5902 16.9078 20.782C16.48 21 15.9203 21 14.8002 21H9.2002C8.08009 21 7.51962 21 7.0918 20.782C6.71547 20.5902 6.40973 20.2844 6.21799 19.908C6 19.4802 6 18.9201 6 17.8V6H18ZM16 6H8C8 5.06812 8 4.60216 8.15224 4.23462C8.35523 3.74456 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74456 15.8477 4.23462C15.9999 4.60216 16 5.06812 16 6Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>

                <div id="tools-slash" className={`cursor-default font-extrabold transition-opacity ${isOnFile === null ? 'opacity-40' : 'opacity-100'}`}>
                    <span>/</span>
                </div>

                <div id="tools-folder" className={`flex gap-[0.5rem] transition-opacity ${isOnFile === false ? 'cursor-pointer opacity-100' : 'cursor-default opacity-40'}`}>
                    <svg
                        id="addFile"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`cursor-pointer transition-colors ${currentAction === Actions.ADDFILE ? 'text-[#7F7EFF]' : 'text-white'} hover:text-[#7F7EFF]`}
                        onClick={isOnFile === false ? () => setAction(Actions.ADDFILE) : undefined}
                    >
                        <path
                            d="M12 18V12M9 15H15M19.0002 9H16.2002C15.0801 9 14.5196 8.99997 14.0918 8.78198C13.7155 8.59024 13.4097 8.28429 13.218 7.90797C13 7.48014 13 6.9201 13 5.8V3M19 17.8V9.3255C19 8.83632 18.9996 8.59169 18.9443 8.36151C18.8953 8.15744 18.8147 7.96238 18.705 7.78343C18.5814 7.5816 18.4089 7.40864 18.063 7.06274L14.9375 3.93726C14.5916 3.59135 14.4186 3.41842 14.2168 3.29474C14.0379 3.18508 13.8428 3.10425 13.6388 3.05526C13.4086 3 13.1639 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71572 5.21799 4.09204C5 4.51986 5 5.07991 5 6.20001V17.8C5 18.9201 5 19.4801 5.21799 19.908C5.40973 20.2843 5.71547 20.5902 6.0918 20.782C6.51962 21 7.08009 21 8.2002 21H15.8002C16.9203 21 17.48 21 17.9078 20.782C18.2841 20.5902 18.5905 20.2843 18.7822 19.908C19.0002 19.4801 19 18.9201 19 17.8Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <svg
                        id="addFolder"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`cursor-pointer transition-colors ${currentAction === Actions.ADDFOLDER ? 'text-[#7F7EFF]' : 'text-white'} hover:text-[#7F7EFF]`}
                        onClick={isOnFile === false ? () => setAction(Actions.ADDFOLDER) : undefined}
                    >
                        <path
                            d="M12 16V10M9 13H15M3 6V16.8C3 17.9201 3 18.4801 3.21799 18.908C3.40973 19.2843 3.71547 19.5902 4.0918 19.782C4.51962 20 5.08009 20 6.2002 20H17.8002C18.9203 20 19.48 20 19.9078 19.782C20.2841 19.5902 20.5905 19.2843 20.7822 18.908C21.0002 18.4801 21.0002 17.9201 21.0002 16.8L21.0002 9.20002C21.0002 8.07992 21.0002 7.51986 20.7822 7.09204C20.5905 6.71572 20.2841 6.40973 19.9078 6.21799C19.48 6 18.9201 6 17.8 6H3ZM3 6C3 4.89543 3.89543 4 5 4H8.67452C9.1637 4 9.40809 4 9.63826 4.05526C9.84234 4.10425 10.0379 4.18508 10.2168 4.29474C10.4186 4.41842 10.5916 4.59135 10.9375 4.93726L12.0002 6"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`cursor-pointer transition-colors ${currentAction === Actions.UPLOAD ? 'text-[#7F7EFF]' : 'text-white'} hover:text-[#7F7EFF]`}
                        onClick={isOnFile === false ? () => setAction(Actions.UPLOAD) : undefined}
                    >
                        <path
                            d="M12 16L12 10M12 10L9 12M12 10L15 12M3 6V16.8C3 17.9201 3 18.4801 3.21799 18.908C3.40973 19.2843 3.71547 19.5902 4.0918 19.782C4.51962 20 5.08009 20 6.2002 20H17.8002C18.9203 20 19.48 20 19.9078 19.782C20.2841 19.5902 20.5905 19.2843 20.7822 18.908C21.0002 18.4801 21.0002 17.9201 21.0002 16.8L21.0002 9.20002C21.0002 8.07992 21.0002 7.51986 20.7822 7.09204C20.5905 6.71572 20.2841 6.40973 19.9078 6.21799C19.48 6 18.9201 6 17.8 6H3ZM3 6C3 4.89543 3.89543 4 5 4H8.67452C9.1637 4 9.40858 4 9.63875 4.05526C9.84282 4.10425 10.0379 4.18508 10.2168 4.29474C10.4186 4.41842 10.5916 4.59135 10.9375 4.93726L12.0002 6"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </div>

            {currentAction === Actions.RENAME || currentAction === Actions.ADDFILE || currentAction === Actions.ADDFOLDER ? (
                <div id="container-input" className="flex gap-[1.2rem] pr-10">
                    <input
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="name"
                        type="text"
                        id="name"
                        name="name"
                        className="w-full rounded-md border border-[#3D3A67] px-[0.8rem] py-[0.5rem] placeholder-[#868686] transition-[900ms] focus:border-[#7F7EFF] focus:outline-none"
                    />

                    <div id="container-tools" className="self-center">
                        <div id="tools" className="flex cursor-pointer gap-[0.5rem]">
                            <svg
                                id="accept"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="cursor-pointer stroke-current transition-colors hover:text-[#7F7EFF]"
                                onClick={() => {
                                    handleAction(currentAction)
                                    setAction(null)
                                }}
                            >
                                <path d="M4 12L8.94975 16.9497L19.5568 6.34314" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            <svg
                                id="decline"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="cursor-pointer stroke-current transition-colors hover:text-[#7F7EFF]"
                                onClick={() => resetTools()}
                            >
                                <path d="M18 18L6 6M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            ) : isSelecting ? (
                <div id="container-tools" className="">
                    <div id="tools" className="flex cursor-pointer gap-[0.5rem]">
                        <svg
                            id="accept"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="cursor-pointer stroke-current transition-colors hover:text-[#7F7EFF]"
                            onClick={() => {
                                handleAction(currentAction)
                                setAction(null)
                                setIsSelecting(false)
                                setSelectedPaths([])
                            }}
                        >
                            <path d="M4 12L8.94975 16.9497L19.5568 6.34314" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <svg
                            id="decline"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="cursor-pointer stroke-current transition-colors hover:text-[#7F7EFF]"
                            onClick={() => {
                                resetTools()
                            }}
                        >
                            <path d="M18 18L6 6M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            ) : null}

            <div id="container-logs" className="flex flex-col gap-1 font-medium">
                <div className="flex gap-[0.5rem]">
                    <span className="bg-[#D9D9D9] px-1 font-extrabold text-[#1B1E24]">log</span>
                    <span>~</span>
                    <span>{resultMessage}</span>
                </div>
            </div>
        </div>
    )
}
