import React, { useRef, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { isOnFileAtom, resultMessagesAtom } from '../utils/atoms'

import { FolderTreeTools } from '../utils/functions/TreeFunctions'

// File action tools:
import Rename from '../assets/tools/fileActions/rename.svg'
import Download from '../assets/tools/fileActions/download.svg'
import Delete from '../assets/tools/fileActions/delete.svg'

// Folder action tools:
import AddFile from '../assets/tools/folderActions/addFile.svg'
import AddFolder from '../assets/tools/folderActions/addFolder.svg'
import Upload from '../assets/tools/folderActions/Upload.svg'

export default function ToolsBar() {
    const [isOnFile, setIsOnFile] = useAtom(isOnFileAtom)
    const [resultMessages, setResultMessages] = useAtom(resultMessagesAtom)

    // // if one of these is true; put a input field above for the name
    const [isRenaming, setIsRenaming] = useState<boolean>(true)
    const [isAdding, setIsAdding] = useState<boolean>(false)

    const [inputValue, setInputValue] = useState<string>()

    // const [selectedProject, setSelectedProject] = useAtom(selectedProjectAtom)

    // const [folderTree, setFolderTree] = useState<Node<FolderData>>()
    // const [currentNode, setCurrentNode] = useState<Node<FolderData>>() // make this a useAtom

    // const [folderPath, setFolderPath] = useAtom(folderPathAtom)
    // const [filePath, setFilePath] = useAtom(filePathAtom)
    // const [fileContent, setFileContent] = useAtom(fileContentAtom)

    // const [isOnFile, setIsOnFile] = useAtom(isOnFileAtom)
    // const [result, setResult] = useState<string>()
    // const [resultMessages, setResultMessages] = useAtom(resultMessagesAtom)

    return (
        <div id="container" className="flex flex-col gap-[1rem]">
            {isRenaming || isAdding ? (
                <div className="container-input">
                    <input
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="name"
                        type="text"
                        id="name"
                        name="name"
                        className="w-[21.25rem] px-[0.8rem] py-[0.5rem] placeholder-[#868686] border-[#3D3A67] border rounded-md transition-[900ms] focus:border-[#7F7EFF] focus:outline-none"
                    />
                </div>
            ) : (
                ''
            )}

            <div id="container-logs" className="flex gap-[0.5rem] font-medium">
                <span className="bg-[#D9D9D9] text-[#1B1E24] font-extrabold px-1">log</span>
                <span className="">~</span>
                <span id="log">{resultMessages}</span>
            </div>

            <div id="container-tools" className="flex gap-[1rem]">
                <div id="tools-file" className="flex gap-[0.5rem] cursor-pointer">
                    <img onClick={FolderTreeTools.Rename()} src={Rename} alt="rename" />
                    <img src={Download} alt="download" />
                    <img src={Delete} alt="delete" />
                </div>

                <div id="tools-slash" className="font-extrabold">
                    <span>/</span>
                </div>

                <div
                    id="tools-folder"
                    className={`flex gap-[0.5rem] transition-opacity
                    ${isOnFile ? 'opacity-40 cursor-default' : 'opacity-100 cursor-pointer'}`}
                >
                    <img src={AddFile} alt="addFile" />
                    <img src={AddFolder} alt="addFolder" />
                    <img src={Upload} alt="upload" />
                </div>
            </div>
        </div>
    )
}
