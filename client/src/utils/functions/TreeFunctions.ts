import { getDefaultStore } from 'jotai'

import { currentNodeAtom, resultMessagesAtom } from '../atoms'

import { editAPI } from '../API'

import { Node } from '../interfaces'
import type { FolderData, EditAPIResponse, RenameResponse, GetFileResponse, Move, MoveResponse, Delete, DeleteResponse, DownloadResponse } from '../interfaces'

export class FolderTreeTools {
    public static async getFile(path: string): Promise<string> {
        try {
            const getFileObject: GetFileResponse = await editAPI.getFile(path)

            if (!getFileObject.result) {
                return getFileObject.message
            } else {
                return getFileObject.data
            }
        } catch (err) {
            return err
        }
    }

    public static async saveFile(path: string, editedContent: string): Promise<string> {
        try {
            const saveFileObject: EditAPIResponse = await editAPI.saveFile(path, editedContent)

            if (!saveFileObject.result) {
                return saveFileObject.message
            } else {
                return saveFileObject.message
            }
        } catch (err) {
            return err
        }
    }

    public static async Rename(path: string, newName: string, currentNode: Node<FolderData>, setCurrentNode: any, setCurrentPath: any): Promise<boolean> {
        const store = getDefaultStore()

        try {
            const renameObject: RenameResponse = await editAPI.Rename(path, newName)
            store.set(resultMessagesAtom, prev => [...prev, renameObject.message])

            if (renameObject.result) {
                currentNode.data.name = newName
                setCurrentNode({ ...currentNode })
                setCurrentPath(currentNode.data.path + '/' + currentNode.data.name)
            }

            return renameObject.result
        } catch (err) {
            store.set(resultMessagesAtom, prev => [...prev, String(err)])
            return false
        }
    }

    public static async addFile(path: string, fileName: string, parentNode: Node<FolderData>, setCurrentNode: any, setCurrentPath: any, setIsOnFile: any): Promise<boolean> {
        const store = getDefaultStore()

        try {
            const addFileObject: EditAPIResponse = await editAPI.addFile(path, fileName)
            store.set(resultMessagesAtom, prev => [...prev, addFileObject.message])

            if (addFileObject.result) {
                const newPath = path.endsWith('/') ? path + fileName : path + '/' + fileName

                const newFileNode = new Node<FolderData>(
                    {
                        name: fileName,
                        path: newPath,
                        type: 'file',
                        depth: parentNode.data.depth + 1,
                    },
                    parentNode,
                    [],
                )

                parentNode.children.push(newFileNode)

                console.log(newPath, 'newPath')
                setIsOnFile(true)
                setCurrentNode({ ...parentNode })
                setCurrentPath(newPath)
            }

            return addFileObject.result
        } catch (err) {
            store.set(resultMessagesAtom, prev => [...prev, String(err)])
            return false
        }
    }

    public static async addFolder(path: string, folderName: string, parentNode: Node<FolderData>, setCurrentNode: (node: Node<FolderData>) => void): Promise<string> {
        try {
            const addFolderObject: EditAPIResponse = await editAPI.addFolder(path)

            if (!addFolderObject.result) {
                return addFolderObject.message
            } else {
                const newPath = path.endsWith('/') ? path + folderName : path + '/' + folderName

                const newFolderNode = new Node<FolderData>(
                    {
                        name: folderName,
                        path: newPath,
                        type: 'directory',
                        depth: parentNode.data.depth + 1,
                    },
                    parentNode,
                    [],
                )

                const updatedParent = new Node<FolderData>(parentNode.data, parentNode.parent, [...(parentNode.children || []), newFolderNode])

                setCurrentNode(updatedParent)

                return 'Folder created'
            }
        } catch (err) {
            return err
        }
    }

    public static async Move(paths: Move[], currentNode: Node<FolderData>, setCurrentNode: any): Promise<string> {
        try {
            const moveObject: MoveResponse = await editAPI.Move(paths)

            // Or it should run FolderTree again to get it from the server instead of keeping track which file is succesfully moved
            const updatedNode = new Node<FolderData>(currentNode.data, currentNode.parent, currentNode.children.filter(child => !paths.some(p => p.path === child.data.path)) || [])

            setCurrentNode(updatedNode)
            return moveObject.message
        } catch (err) {
            return err
        }
    }

    public static async Upload(file: File): Promise<string> {
        try {
            const form = new FormData()
            form.append('file', file)

            // call FolderTree
            const uploadObject: any = await editAPI.Upload(form)

            return uploadObject.message
        } catch (err) {
            return err
        }
    }

    public static async Delete(paths: Delete[], currentNode: Node<FolderData>, setCurrentNode: any): Promise<string> {
        try {
            const deleteObject: DeleteResponse = await editAPI.Delete(paths)

            // Or it should run FolderTree again to get it from the server instead of keeping track which file is succesfully deleted
            const updatedNode = new Node<FolderData>(currentNode.data, currentNode.parent, currentNode.children?.filter(child => child.data.path !== child.data.path) || [])

            setCurrentNode(updatedNode)
            return deleteObject.message
        } catch (err) {
            return err
        }
    }

    public static async Download(paths: Delete[]): Promise<string> {
        try {
            const downloadObject: DownloadResponse = await editAPI.Download(paths)

            return downloadObject.message
        } catch (err) {
            return err
        }
    }
}
