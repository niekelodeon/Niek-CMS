import React, { useRef, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { FolderTreeFunctions } from '../utils/functions/TreeFunctions'
import { editAPI } from '../utils/API'

import { Variables } from '../utils/variables'

import { Node, type FolderData, type FolderTreeMethods } from '../utils/interfaces'

import { filePathAtom, fileContentAtom } from '../utils/atoms'

export default function FolderTree() {
    const [folderTree, setFolderTree] = useState<Node<FolderData>>()

    const [filePath, setFilePath] = useAtom(filePathAtom)
    const [fileContent, setFileContent] = useAtom(fileContentAtom)

    useEffect(() => {
        const fetchTree = async () => {
            const path = 'Dir1'

            const folderTree: Node<FolderData> | string = await editAPI.folderTree(path)
            if (typeof folderTree !== 'string') setFolderTree(folderTree)
        }

        fetchTree()
    }, [])

    function clickFile(filePath: string) {
        const fetchFileContent = async () => {
            const fileContent: any = await editAPI.getFile(filePath)
            console.log(fileContent)
            setFileContent(atob(fileContent.data))

            setFilePath(filePath)
        }

        fetchFileContent()
    }

    interface FileItemProps {
        currentNode: Node<FolderData>
        clickFile: (filePath: string) => void
    }

    function FileItem({ currentNode, clickFile }: FileItemProps) {
        const [isRenaming, setIsRenaming] = useState(false)
        const [name, setName] = useState(currentNode.data.name)
        const inputRef = useRef<HTMLInputElement>(null)

        useEffect(() => {
            if (isRenaming && inputRef.current) {
                inputRef.current.focus()
            }
        }, [isRenaming])

        async function onLeave(path: string, newName: string, currentNode: Node<FolderData>) {
            if (await FolderTreeFunctions.Rename(path, newName, currentNode)) setFolderTree(new Node<FolderData>(folderTree.data, null, folderTree.children))
        }

        if (isRenaming) {
            return (
                <input
                    id="rename"
                    ref={inputRef}
                    onChange={e => setName(e.target.value)}
                    onBlur={() => setIsRenaming(false)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === 'Escape') {
                            onLeave(currentNode.data.path, name, currentNode)
                        }
                    }}
                    value={name}
                    key={currentNode.data.name}
                />
            )
        }

        return (
            <div id="file" className="cursor-pointer" onClick={() => clickFile(currentNode.data.path + `/${currentNode.data.name}`)} onDoubleClick={() => setIsRenaming(true)} key={currentNode.data.name}>
                {currentNode.data.name}
            </div>
        )

        // do the renaming here, visually
        // then call updateTree with the new name and method "rename"
        // if that returns true, update it visually permanently / release the edit
        // else show a red border or something
    }

    function renderTree(folderTree: Node<FolderData>): React.ReactElement {
        if (folderTree.data.type === 'file') {
            return <FileItem currentNode={folderTree} clickFile={clickFile} />
        }

        return (
            <div id="container-structure" className="cursor-default" key={folderTree.data.name} draggable>
                <div id="" className="">
                    <div id="container-directory" className="flex flex-row">
                        {/* if Directory: */}
                        <span>{folderTree.data.name}</span>

                        <div id="container-tools">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.33331 10L7.4581 14.1248L16.2973 5.28595" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                {folderTree.children && folderTree.children.length > 0 ? (
                    <div id="" className="flex flex-row">
                        {/* if File: */}
                        <div id="container-file" className="">
                            <span>{folderTree.children.map(child => renderTree(child))}</span>

                            <div id="container-tools">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 15V10M7.50002 12.5H12.5M15.8335 7.5H13.5002C12.5668 7.5 12.0997 7.49997 11.7432 7.31832C11.4296 7.15853 11.1748 6.90358 11.015 6.58997C10.8334 6.23345 10.8334 5.76675 10.8334 4.83333V2.5M15.8334 14.8333V7.77125C15.8334 7.3636 15.833 7.15974 15.787 6.96793C15.7461 6.79787 15.6789 6.63531 15.5876 6.48619C15.4845 6.318 15.3408 6.17387 15.0525 5.88562L12.4479 3.28105C12.1597 2.9928 12.0155 2.84869 11.8474 2.74562C11.6982 2.65423 11.5357 2.58688 11.3656 2.54605C11.1738 2.5 10.9699 2.5 10.5623 2.5H6.83352C5.9001 2.5 5.43304 2.5 5.07652 2.68166C4.76291 2.84144 4.50813 3.09643 4.34834 3.41003C4.16669 3.76655 4.16669 4.23326 4.16669 5.16668V14.8333C4.16669 15.7668 4.16669 16.2335 4.34834 16.59C4.50813 16.9036 4.76291 17.1585 5.07652 17.3183C5.43304 17.5 5.9001 17.5 6.83352 17.5H13.1669C14.1003 17.5 14.5667 17.5 14.9232 17.3183C15.2368 17.1585 15.4921 16.9036 15.6519 16.59C15.8335 16.2335 15.8334 15.7668 15.8334 14.8333Z"
                                        stroke="white"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>

            // <div id="container-tools" className="flex flex-row">
            //             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            //                 <path
            //                     d="M11.6666 8.33333V14.1667M8.33331 8.33333L8.33331 14.1667M3.33331 5H16.6666M15 5V14.8333C15 15.7668 15.0002 16.2335 14.8185 16.59C14.6587 16.9036 14.4034 17.1585 14.0898 17.3183C13.7333 17.5 13.2669 17.5 12.3335 17.5H7.66681C6.73339 17.5 6.26633 17.5 5.90981 17.3183C5.59621 17.1585 5.34142 16.9036 5.18164 16.59C4.99998 16.2335 4.99998 15.7668 4.99998 14.8333V5H15ZM13.3333 5H6.66665C6.66665 4.22343 6.66665 3.83513 6.79351 3.52885C6.96267 3.12047 7.28691 2.79602 7.69529 2.62687C8.00158 2.5 8.39008 2.5 9.16665 2.5H10.8333C11.6099 2.5 11.9982 2.5 12.3045 2.62687C12.7128 2.79602 13.0372 3.12047 13.2064 3.52885C13.3332 3.83513 13.3333 4.22343 13.3333 5Z"
            //                     stroke="white"
            //                     stroke-width="2"
            //                     stroke-linecap="round"
            //                     stroke-linejoin="round"
            //                 />
            //             </svg>

            //             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            //                 <path
            //                     d="M10 15V10M7.50002 12.5H12.5M15.8335 7.5H13.5002C12.5668 7.5 12.0997 7.49997 11.7432 7.31832C11.4296 7.15853 11.1748 6.90358 11.015 6.58997C10.8334 6.23345 10.8334 5.76675 10.8334 4.83333V2.5M15.8334 14.8333V7.77125C15.8334 7.3636 15.833 7.15974 15.787 6.96793C15.7461 6.79787 15.6789 6.63531 15.5876 6.48619C15.4845 6.318 15.3408 6.17387 15.0525 5.88562L12.4479 3.28105C12.1597 2.9928 12.0155 2.84869 11.8474 2.74562C11.6982 2.65423 11.5357 2.58688 11.3656 2.54605C11.1738 2.5 10.9699 2.5 10.5623 2.5H6.83352C5.9001 2.5 5.43304 2.5 5.07652 2.68166C4.76291 2.84144 4.50813 3.09643 4.34834 3.41003C4.16669 3.76655 4.16669 4.23326 4.16669 5.16668V14.8333C4.16669 15.7668 4.16669 16.2335 4.34834 16.59C4.50813 16.9036 4.76291 17.1585 5.07652 17.3183C5.43304 17.5 5.9001 17.5 6.83352 17.5H13.1669C14.1003 17.5 14.5667 17.5 14.9232 17.3183C15.2368 17.1585 15.4921 16.9036 15.6519 16.59C15.8335 16.2335 15.8334 15.7668 15.8334 14.8333Z"
            //                     stroke="white"
            //                     stroke-width="2"
            //                     stroke-linecap="round"
            //                     stroke-linejoin="round"
            //                 />
            //             </svg>

            //             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            //                 <path
            //                     d="M10 13.3333V8.33333M7.5 10.8333H12.5M2.5 4.99999V14C2.5 14.9334 2.5 15.4001 2.68166 15.7566C2.84144 16.0702 3.09623 16.3252 3.40983 16.485C3.76635 16.6666 4.23341 16.6667 5.16683 16.6667H14.8335C15.7669 16.6667 16.2333 16.6666 16.5898 16.485C16.9034 16.3252 17.1587 16.0702 17.3185 15.7566C17.5002 15.4001 17.5002 14.9334 17.5002 14L17.5002 7.66668C17.5002 6.73326 17.5002 6.26655 17.3185 5.91003C17.1587 5.59643 16.9034 5.34144 16.5898 5.18165C16.2333 4.99999 15.7668 4.99999 14.8333 4.99999H2.5ZM2.5 4.99999C2.5 4.07952 3.24619 3.33333 4.16667 3.33333H7.22876C7.63641 3.33333 7.84007 3.33333 8.03189 3.37938C8.20195 3.42021 8.36488 3.48756 8.514 3.57894C8.68219 3.68201 8.82633 3.82612 9.11458 4.11437L10.0002 4.99999"
            //                     stroke="white"
            //                     stroke-width="2"
            //                     stroke-linecap="round"
            //                     stroke-linejoin="round"
            //                 />
            //             </svg>

            //             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            //                 <path
            //                     d="M10 8.33334L10 13.3333M10 13.3333L12.5 11.6667M10 13.3333L7.5 11.6667M2.5 5.00001V14C2.5 14.9334 2.5 15.4001 2.68166 15.7567C2.84144 16.0703 3.09623 16.3252 3.40983 16.485C3.76635 16.6667 4.23341 16.6667 5.16683 16.6667H14.8335C15.7669 16.6667 16.2333 16.6667 16.5898 16.485C16.9034 16.3252 17.1587 16.0703 17.3185 15.7567C17.5002 15.4001 17.5002 14.9334 17.5002 14L17.5002 7.6667C17.5002 6.73327 17.5002 6.26656 17.3185 5.91004C17.1587 5.59644 16.9034 5.34145 16.5898 5.18167C16.2333 5.00001 15.7668 5.00001 14.8333 5.00001H2.5ZM2.5 5.00001C2.5 4.07954 3.24619 3.33334 4.16667 3.33334H7.22876C7.63641 3.33334 7.84048 3.33334 8.03229 3.37939C8.20235 3.42022 8.36488 3.48758 8.514 3.57896C8.68219 3.68203 8.82633 3.82614 9.11458 4.11439L10.0002 5.00001"
            //                     stroke="white"
            //                     stroke-width="2"
            //                     stroke-linecap="round"
            //                     stroke-linejoin="round"
            //                 />
            //             </svg>

            //             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            //                 <path
            //                     d="M10 13.3333L10 8.33334M10 8.33334L7.5 10M10 8.33334L12.5 10M2.5 5.00001V14C2.5 14.9334 2.5 15.4001 2.68166 15.7567C2.84144 16.0703 3.09623 16.3252 3.40983 16.485C3.76635 16.6667 4.23341 16.6667 5.16683 16.6667H14.8335C15.7669 16.6667 16.2333 16.6667 16.5898 16.485C16.9034 16.3252 17.1587 16.0703 17.3185 15.7567C17.5002 15.4001 17.5002 14.9334 17.5002 14L17.5002 7.6667C17.5002 6.73327 17.5002 6.26656 17.3185 5.91004C17.1587 5.59644 16.9034 5.34145 16.5898 5.18167C16.2333 5.00001 15.7668 5.00001 14.8333 5.00001H2.5ZM2.5 5.00001C2.5 4.07954 3.24619 3.33334 4.16667 3.33334H7.22876C7.63641 3.33334 7.84048 3.33334 8.03229 3.37939C8.20235 3.42022 8.36488 3.48758 8.514 3.57896C8.68219 3.68203 8.82633 3.82614 9.11458 4.11439L10.0002 5.00001"
            //                     stroke="white"
            //                     stroke-width="2"
            //                     stroke-linecap="round"
            //                     stroke-linejoin="round"
            //                 />
            //             </svg>
            //         </div>
        )
    }

    return <div className="">{folderTree ? renderTree(folderTree) : <div>Loading...</div>}</div>
}
