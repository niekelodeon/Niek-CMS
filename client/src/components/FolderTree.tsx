import React, { useRef, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

// import { useTreeStore } from '../utils/store'
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
            <div id="container-folder" className="cursor-default" key={folderTree.data.name} draggable>
                <div id="container-wrapper" className="flex flex-row items-center">
                    <span>{folderTree.data.name}</span>
                </div>

                {folderTree.children && folderTree.children.length > 0 ? (
                    <div id="folder-parent" className="ml-4">
                        {folderTree.children.map(child => renderTree(child))}
                    </div>
                ) : (
                    ''
                )}
            </div>
        )
    }

    return <div className="">{folderTree ? renderTree(folderTree) : <div>Loading...</div>}</div>
}
