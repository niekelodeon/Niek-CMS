import React, { useRef, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import ToolsBar from '../components/ToolsBar'

import { FolderTreeTools } from '../utils/functions/TreeFunctions'

import { selectedProjectAtom, folderTreeAtom, currentPathAtom, currentNodeAtom, fileContentAtom, isOnFileAtom, currentActionAtom, resultMessagesAtom } from '../utils/atoms'

import { editAPI } from '../utils/API'

import { Node } from '../utils/interfaces'
import type { FolderData, FileItemProps } from '../utils/interfaces'

export default function FolderTree() {
    const [selectedProject, setSelectedProject] = useAtom(selectedProjectAtom)

    const [folderTree, setFolderTree] = useAtom(folderTreeAtom)

    const [currentNode, setCurrentNode] = useAtom(currentNodeAtom)
    const [currentPath, setCurrentPath] = useAtom(currentPathAtom)

    const [fileContent, setFileContent] = useAtom(fileContentAtom)

    const [isOnFile, setIsOnFile] = useAtom(isOnFileAtom)
    const [currentToolState, setcurrentToolState] = useAtom(currentActionAtom)

    const [resultMessages, setResultMessages] = useAtom(resultMessagesAtom)

    async function clickFile(filePath: string, currentNode: Node<FolderData>) {
        const fileContent: any = await editAPI.getFile(filePath)
        setCurrentNode(currentNode)
        setCurrentPath(filePath)
        setFileContent(atob(fileContent.data))
        setIsOnFile(true)

        console.log('current filePath:', filePath, currentNode.data.path + '/' + currentNode.data.name)
    }

    async function clickFolder(folderPath: string, currentNode: Node<FolderData>) {
        setCurrentNode(currentNode)
        setCurrentPath(folderPath)
        setFileContent('You selected a folder.') // instead remove the codeEditor.tsx or replace the editor with that text
        setIsOnFile(false)

        console.log('current folderPath:', currentNode.data.path + '/' + currentNode.data.name)
    }

    useEffect(() => {
        const fetchTree = async () => {
            localStorage.setItem('Project', 'Dir1')
            setSelectedProject(localStorage.getItem('Project') || '')
            setIsOnFile(null)

            const folderTree: Node<FolderData> | string = await editAPI.folderTree(selectedProject)
            if (typeof folderTree !== 'string') setFolderTree(folderTree)
        }

        fetchTree()
    }, [])

    function FileItem({ currentNode, clickFile }: FileItemProps) {
        return (
            <div
                id="file-container"
                className={`cursor-pointer px-2 py-1 rounded transition-all duration-150 ${currentPath === currentNode.data.path + '/' + currentNode.data.name ? 'text-[#7F7EFF]' : 'text-white'}`}
                onClick={() => clickFile(currentNode.data.path + `/${currentNode.data.name}`, currentNode)}
            >
                {currentNode.data.name}
            </div>
        )
    }

    function renderTree(nextNode: Node<FolderData>): React.ReactElement {
        if (nextNode.data.type === 'file') {
            return (
                <div id="container-file">
                    <FileItem currentNode={nextNode} clickFile={clickFile} />
                </div>
            )
        }

        return (
            <div id="container" className="flex flex-col">
                <div id="container-structure" className="cursor-default" key={nextNode.data.name} draggable>
                    <div id="container-directory" className="flex flex-row">
                        <div onClick={() => clickFolder(nextNode.data.path + '/' + nextNode.data.name, nextNode)} className={currentPath === nextNode.data.path + '/' + nextNode.data.name ? 'text-[#7F7EFF]' : 'text-white'}>
                            {nextNode.data.name}
                        </div>
                    </div>

                    {nextNode.children && nextNode.children.length > 0 ? (
                        <div id="container-file" className="ml-4">
                            {nextNode.children.map(child => renderTree(child))}
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col justify-between">
            {/* if the user didnt select a project / there is no project in the cookie then show: 'please select a project in settings' */}
            {folderTree ? renderTree(folderTree) : <div>Loading...</div>}

            <div id="container" className="flex flex-col gap-2">
                <ToolsBar />
            </div>
        </div>
    )
}
