import React, { useRef, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import ToolsBar from '../components/ToolsBar'

import { FolderTreeTools } from '../utils/functions/TreeFunctions'

import { projectNameAtom, folderTreeAtom, currentPathAtom, currentNodeAtom, fileContentAtom, isOnFileAtom, currentActionAtom, setIsSelectingAtom, selectedPathsAtom, resultMessageAtom } from '../utils/atoms'

import { editAPI } from '../utils/API'

import { Node } from '../utils/interfaces'
import type { FolderData, FileItemProps } from '../utils/interfaces'

export default function FolderTree() {
    const [projectName, setProjectName] = useAtom(projectNameAtom)

    const [folderTree, setFolderTree] = useAtom(folderTreeAtom)

    const [currentNode, setCurrentNode] = useAtom(currentNodeAtom)
    const [currentPath, setCurrentPath] = useAtom(currentPathAtom)

    const [fileContent, setFileContent] = useAtom(fileContentAtom)

    const [isOnFile, setIsOnFile] = useAtom(isOnFileAtom)
    const [currentToolState, setcurrentToolState] = useAtom(currentActionAtom)

    const [isSelecting, setIsSelecting] = useAtom(setIsSelectingAtom)
    const [selectedPaths, setSelectedPaths] = useAtom(selectedPathsAtom)

    const [resultMessage, setResultMessage] = useAtom(resultMessageAtom)

    async function clickFile(filePath: string, currentNode: Node<FolderData>) {
        const fileContent: any = await FolderTreeTools.getFile(filePath)
        setCurrentNode(currentNode)
        setCurrentPath(filePath)
        setFileContent(fileContent)
        setIsOnFile(true)
    }

    async function clickFolder(folderPath: string, currentNode: Node<FolderData>) {
        setCurrentNode(currentNode)
        setCurrentPath(folderPath)
        setFileContent('You selected a folder.')
        setIsOnFile(false)
    }

    function toggleSelected(path: string) {
        setSelectedPaths(prev => {
            const next = new Set(prev)
            next.has(path) ? next.delete(path) : next.add(path)
            return [...next]
        })

        console.log(isSelecting, selectedPaths)
    }

    useEffect(() => {
        const fetchTree = async () => {
            // localStorage.setItem('Project', 'Dir1')
            // setProjectName(localStorage.getItem('Project') || '')
            setIsOnFile(null)

            const folderTree: Node<FolderData> | string = await editAPI.folderTree(projectName)
            if (typeof folderTree !== 'string') setFolderTree(folderTree)
        }

        fetchTree()
    }, [])

    function FileItem({ currentNode, clickFile }: FileItemProps) {
        return (
            <div id="container-item" className={`flex w-fit cursor-pointer gap-3 rounded py-1 transition-all duration-150 ${currentPath === currentNode.data.path + '/' + currentNode.data.name ? 'text-[#7F7EFF]' : 'text-white'}`}>
                {isSelecting ? (
                    <input
                        type="checkbox"
                        checked={selectedPaths.includes(currentNode.data.path + '/' + currentNode.data.name)}
                        onChange={() => toggleSelected(currentNode.data.path + '/' + currentNode.data.name)}
                        className="flex h-4 w-4 cursor-pointer appearance-none self-center rounded border-2 border-white opacity-[40%] checked:border-[#7F7EFF] checked:bg-[#7F7EFF] checked:opacity-[100%]"
                    />
                ) : (
                    ''
                )}

                <div id="file" className="" onClick={() => clickFile(currentNode.data.path + '/' + currentNode.data.name, currentNode)}>
                    {currentNode.data.name}
                </div>
            </div>
        )
    }

    function renderTree(nextNode: Node<FolderData>): React.ReactElement {
        if (nextNode.data.type === 'file') {
            return <FileItem currentNode={nextNode} clickFile={clickFile} />
        }

        return (
            <div id="container-tree" className="flex cursor-default flex-col" key={nextNode.data.name} draggable>
                <div id="container-directory" className="flex w-fit cursor-pointer gap-3 rounded py-1 transition-all duration-150">
                    {isSelecting ? (
                        <input
                            type="checkbox"
                            checked={selectedPaths.includes(nextNode.data.path + '/' + nextNode.data.name)}
                            onChange={() => toggleSelected(nextNode.data.path + '/' + nextNode.data.name)}
                            className="flex h-4 w-4 cursor-pointer appearance-none self-center rounded border-2 border-white opacity-[40%] checked:border-[#7F7EFF] checked:bg-[#7F7EFF] checked:opacity-[100%]"
                        />
                    ) : (
                        ''
                    )}

                    <div
                        id="folder"
                        className={currentPath === nextNode.data.path + '/' + nextNode.data.name ? 'text-[#7F7EFF]' : 'text-white'}
                        onClick={() => clickFolder(nextNode.data.path + '/' + (nextNode.parent != null ? nextNode.data.name : ''), nextNode)}
                    >
                        {nextNode.data.name}
                    </div>
                </div>

                {nextNode.children && nextNode.children.length > 0 ? (
                    <div id="container-items" className="ml-4">
                        {nextNode.children.map(child => renderTree(child))}
                    </div>
                ) : (
                    ''
                )}
            </div>
        )
    }

    return (
        <div id="container-main" className="flex w-full flex-col gap-10">
            {folderTree ? <div className="flex max-h-[75vh] min-h-[75vh] flex-col justify-between overflow-auto">{renderTree(folderTree)}</div> : <div>Loading...</div>}

            <ToolsBar />
        </div>
    )
}
