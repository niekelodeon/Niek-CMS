import React, { useRef, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { FolderTreeFunctions } from '../utils/functions/TreeFunctions'

import { filePathAtom, fileContentAtom, isOnFileAtom } from '../utils/atoms'

import { editAPI } from '../utils/API'
import { Variables } from '../utils/variables'

import { Node, type FolderData, type FolderTreeMethods } from '../utils/interfaces'

export default function FolderTree() {
    const [folderTree, setFolderTree] = useState<Node<FolderData>>()

    const [filePath, setFilePath] = useAtom(filePathAtom)
    const [fileContent, setFileContent] = useAtom(fileContentAtom)

    const [isOnFile, setIsOnFile] = useAtom(isOnFileAtom)

    function clickFile(filePath: string) {
        const fetchFileContent = async () => {
            const fileContent: any = await editAPI.getFile(filePath)
            setFileContent(atob(fileContent.data))
            setFilePath(filePath)
            setIsOnFile(true)
        }

        fetchFileContent()
    }

    interface FileItemProps {
        currentNode: Node<FolderData>
        clickFile: (filePath: string) => void
    }

    // on load:
    useEffect(() => {
        const fetchTree = async () => {
            const path = 'Dir1'

            const folderTree: Node<FolderData> | string = await editAPI.folderTree(path)
            if (typeof folderTree !== 'string') setFolderTree(folderTree)
        }

        fetchTree()
    }, [])

    function FileItem({ currentNode, clickFile }: FileItemProps) {
        return (
            <div id="file" className="cursor-pointer" onClick={() => clickFile(currentNode.data.path + `/${currentNode.data.name}`)}>
                {currentNode.data.name}
            </div>
        )
    }

    function test() {
        console.log('button test')
    }

    function renderTree(folderTree: Node<FolderData>): React.ReactElement {
        if (folderTree.data.type === 'file') {
            return (
                <div id="container-file">
                    <FileItem currentNode={folderTree} clickFile={clickFile} />
                </div>
            )
        }

        return (
            <div id="container" className="flex flex-col">
                <div id="container-structure" className="cursor-default" key={folderTree.data.name} draggable>
                    <div id="container-directory" className="flex flex-row">
                        <span>{folderTree.data.name}</span>
                    </div>

                    {folderTree.children && folderTree.children.length > 0 ? (
                        <div id="container-file" className="ml-4">
                            <span>{folderTree.children.map(child => renderTree(child))}</span>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        )
    }

    function renderTools() {
        if (!isOnFile) {
            return (
                <div id="container-tools">
                    <button id="button-edit" onClick={() => test()}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 16V20L8 20L18.8686 9.13134C19.2646 8.73532 19.4627 8.53728 19.5369 8.30895C19.6021 8.10811 19.6021 7.89184 19.5369 7.691C19.4627 7.46267 19.2646 7.26462 18.8686 6.8686L17.1313 5.13134L17.1307 5.13067C16.7351 4.7351 16.5373 4.53727 16.3091 4.46313C16.1082 4.39787 15.8919 4.39787 15.691 4.46313C15.4627 4.53732 15.2646 4.73532 14.8686 5.13134L4 16Z"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>

                    <button id="button-copy" onClick={() => test()}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15 15H17.8C18.9201 15 19.48 15 19.9078 14.782C20.2841 14.5902 20.5905 14.2844 20.7822 13.908C21.0002 13.4802 21.0002 12.9202 21.0002 11.8V6.20002C21.0002 5.07992 21.0002 4.51986 20.7822 4.09204C20.5905 3.71572 20.2841 3.40973 19.9078 3.21799C19.48 3 18.9203 3 17.8002 3H12.2002C11.0801 3 10.5196 3 10.0918 3.21799C9.71547 3.40973 9.40973 3.71572 9.21799 4.09204C9 4.51986 9 5.07997 9 6.20007V9.00007M3 17.8001V12.2001C3 11.08 3 10.5199 3.21799 10.092C3.40973 9.71572 3.71547 9.40973 4.0918 9.21799C4.51962 9 5.08009 9 6.2002 9H11.8002C12.9203 9 13.48 9 13.9078 9.21799C14.2841 9.40973 14.5905 9.71572 14.7822 10.092C15.0002 10.5199 15.0002 11.0799 15.0002 12.2V17.8C15.0002 18.9202 15.0002 19.4802 14.7822 19.908C14.5905 20.2844 14.2841 20.5902 13.9078 20.782C13.48 21 12.9203 21 11.8002 21H6.2002C5.08009 21 4.51962 21 4.0918 20.782C3.71547 20.5902 3.40973 20.2844 3.21799 19.908C3 19.4802 3 18.9202 3 17.8001Z"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>

                    <button id="button-download" onClick={() => test()}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 10L12 16M12 16L15 14M12 16L9 14M3 6V16.8C3 17.9201 3 18.4801 3.21799 18.908C3.40973 19.2843 3.71547 19.5902 4.0918 19.782C4.51962 20 5.08009 20 6.2002 20H17.8002C18.9203 20 19.48 20 19.9078 19.782C20.2841 19.5902 20.5905 19.2843 20.7822 18.908C21.0002 18.4801 21.0002 17.9201 21.0002 16.8L21.0002 9.20002C21.0002 8.07992 21.0002 7.51986 20.7822 7.09204C20.5905 6.71572 20.2841 6.40973 19.9078 6.21799C19.48 6 18.9201 6 17.8 6H3ZM3 6C3 4.89543 3.89543 4 5 4H8.67452C9.1637 4 9.40858 4 9.63875 4.05526C9.84282 4.10425 10.0379 4.18508 10.2168 4.29474C10.4186 4.41842 10.5916 4.59135 10.9375 4.93726L12.0002 6"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>

                    <button id="button-add-file" onClick={() => test()}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 18V12M9 15H15M19.0002 9H16.2002C15.0801 9 14.5196 8.99997 14.0918 8.78198C13.7155 8.59024 13.4097 8.28429 13.218 7.90797C13 7.48014 13 6.9201 13 5.8V3M19 17.8V9.3255C19 8.83632 18.9996 8.59169 18.9443 8.36151C18.8953 8.15744 18.8147 7.96238 18.705 7.78343C18.5814 7.5816 18.4089 7.40864 18.063 7.06274L14.9375 3.93726C14.5916 3.59135 14.4186 3.41842 14.2168 3.29474C14.0379 3.18508 13.8428 3.10425 13.6388 3.05526C13.4086 3 13.1639 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71572 5.21799 4.09204C5 4.51986 5 5.07991 5 6.20001V17.8C5 18.9201 5 19.4801 5.21799 19.908C5.40973 20.2843 5.71547 20.5902 6.0918 20.782C6.51962 21 7.08009 21 8.2002 21H15.8002C16.9203 21 17.48 21 17.9078 20.782C18.2841 20.5902 18.5905 20.2843 18.7822 19.908C19.0002 19.4801 19 18.9201 19 17.8Z"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>

                    <button id="button-delete" onClick={() => test()}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14 10V17M10 10L10 17M4 6H20M18 6V17.8C18 18.9201 18.0002 19.4802 17.7822 19.908C17.5905 20.2844 17.2841 20.5902 16.9078 20.782C16.48 21 15.9203 21 14.8002 21H9.2002C8.08009 21 7.51962 21 7.0918 20.782C6.71547 20.5902 6.40973 20.2844 6.21799 19.908C6 19.4802 6 18.9201 6 17.8V6H18ZM16 6H8C8 5.06812 8 4.60216 8.15224 4.23462C8.35523 3.74456 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74456 15.8477 4.23462C15.9999 4.60216 16 5.06812 16 6Z"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            )
        } else {
            return <div id="container-tools">Folder tools</div>
        }
    }

    return (
        <div className="">
            {folderTree ? renderTree(folderTree) : <div>Loading...</div>}

            {renderTools()}
        </div>
    )
}
