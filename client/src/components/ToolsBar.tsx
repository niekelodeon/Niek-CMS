import React, { useRef, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { Actions } from '../utils/interfaces'

import type { FolderData, EditAPIResponse, RenameResponse, GetFileResponse, Move, MoveResponse, Delete, DeleteResponse, DownloadResponse } from '../utils/interfaces'

import { projectNameAtom, folderTreeAtom, currentPathAtom, currentNodeAtom, fileContentAtom, isOnFileAtom, currentActionAtom, selectedPathsAtom, setIsSelectingAtom, resultMessagesAtom } from '../utils/atoms'

import { FolderTreeTools } from '../utils/functions/TreeFunctions'

// Accept / decline:
import Accept from '../assets/tools/accept.svg'
import Decline from '../assets/tools/decline.svg'

// File action tools:
import Rename from '../assets/tools/fileActions/rename.svg'
import Download from '../assets/tools/fileActions/download.svg'
import Erase from '../assets/tools/fileActions/erase.svg'

// Folder action tools:
import AddFile from '../assets/tools/folderActions/addFile.svg'
import AddFolder from '../assets/tools/folderActions/addFolder.svg'
import Upload from '../assets/tools/folderActions/Upload.svg'

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

    const [resultMessages, setResultMessages] = useAtom(resultMessagesAtom)

    const [isRenaming, setIsRenaming] = useState<boolean>(false)
    const [isAdding, setIsAdding] = useState<boolean>(false)

    const [inputValue, setInputValue] = useState<string>()

    function setAction(action: Actions) {
        console.log(action)
        console.log(isRenaming, isAdding)
        console.log(resultMessages)

        if (action === Actions.RENAME || action === Actions.ADDFILE || action === Actions.ADDFOLDER) setIsRenaming(true), setIsAdding(true), setIsSelecting(false)
        else setIsRenaming(false), setIsAdding(false), setIsSelecting(true)

        setCurrentAction(action)
    }

    async function handleAction(action: Actions) {
        if (action === Actions.RENAME) await FolderTreeTools.Rename(currentPath, inputValue, currentNode, setCurrentNode, setCurrentPath)

        // if (action === Actions.DOWNLOAD) FolderTreeTools.Download(selectedPaths)

        if (action === Actions.DELETE) FolderTreeTools.Delete(selectedPaths, projectName, setFolderTree)

        if (action === Actions.ADDFILE) FolderTreeTools.addFile(currentPath, inputValue, currentNode, setCurrentNode, setCurrentPath, setIsOnFile)
        if (action === Actions.ADDFOLDER) FolderTreeTools.addFolder(currentPath, inputValue, currentNode, setCurrentNode, setCurrentPath, setIsOnFile)
        // if (action === Actions.UPLOAD) FolderTreeTools.Upload(File)

        // set currentPath on the renamed file

        setIsRenaming(false), setIsAdding(false)
    }

    // option 1:
    // User clicks on rename, currentAction = RENAME. Then when the user presses ✅ it goes through currentToolState to see what FolderTreeTools function to call.

    return (
        <div id="container" className="flex flex-col gap-[1rem]">
            {isRenaming || isAdding ? (
                <div id="container-input" className="flex gap-[1.2rem]">
                    <input
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="name"
                        type="text"
                        id="name"
                        name="name"
                        className="w-[21.25rem] px-[0.8rem] py-[0.5rem] placeholder-[#868686] border-[#3D3A67] border rounded-md transition-[900ms] focus:border-[#7F7EFF] focus:outline-none"
                    />

                    <div id="container-tools" className="self-center">
                        <div id="tools" className="flex gap-[0.5rem] cursor-pointer">
                            <img
                                onClick={() => {
                                    handleAction(currentAction)
                                    setIsRenaming(false)
                                    setIsAdding(false)
                                }}
                                src={Accept}
                                alt="accept"
                            />
                            <img
                                onClick={() => {
                                    setIsRenaming(false)
                                    setIsAdding(false)
                                }}
                                src={Decline}
                                alt="decline"
                            />
                        </div>
                    </div>
                </div>
            ) : isSelecting ? (
                <div id="container-tools" className="self-center">
                    <div id="tools" className="flex gap-[0.5rem] cursor-pointer">
                        <img
                            onClick={() => {
                                handleAction(currentAction)
                                setIsSelecting(false)
                                setSelectedPaths([])
                            }}
                            src={Accept}
                            alt="accept"
                        />
                        <img
                            onClick={() => {
                                setIsSelecting(false)
                                setSelectedPaths([])
                            }}
                            src={Decline}
                            alt="decline"
                        />
                    </div>
                </div>
            ) : (
                ''
            )}

            <div id="container-logs" className="flex flex-col font-medium overflow-y-scroll max-h-[120px] gap-1">
                {resultMessages.map((msg, i) => (
                    <div key={i} className="flex gap-[0.5rem]">
                        <span className="bg-[#D9D9D9] text-[#1B1E24] font-extrabold px-1">log</span>
                        <span>~</span>
                        <span>{msg}</span>
                    </div>
                ))}
            </div>

            {/* when it's clicked again: setAction = null */}
            <div id="container-tools" className="flex gap-[1rem]">
                <div id="tools-file" className={`flex gap-[0.5rem] transition-opacity ${isOnFile === null ? 'opacity-40 cursor-default' : 'opacity-100 cursor-pointer'}`}>
                    <img onClick={() => setAction(Actions.RENAME)} src={Rename} alt="rename" />
                    <img onClick={() => setAction(Actions.DOWNLOAD)} src={Download} alt="download" />
                    <img onClick={() => setAction(Actions.DELETE)} src={Erase} alt="erase" />
                </div>

                <div id="tools-slash" className={`font-extrabold transition-opacity cursor-default ${isOnFile === null ? 'opacity-40' : 'opacity-100'}`}>
                    <span>/</span>
                </div>

                <div id="tools-folder" className={`flex gap-[0.5rem] transition-opacity ${isOnFile === false ? 'opacity-100 cursor-pointer' : 'opacity-40 cursor-default'}`}>
                    <img onClick={() => setAction(Actions.ADDFILE)} src={AddFile} alt="addFile" />
                    <img onClick={() => setAction(Actions.ADDFOLDER)} src={AddFolder} alt="addFolder" />
                    <img onClick={() => setAction(Actions.UPLOAD)} src={Upload} alt="upload" />
                </div>
            </div>
        </div>
    )
}
