import { useAtom } from 'jotai'

import { resultMessagesAtom } from '../../utils/atoms'

import { editAPI } from '../API'

import { Node, type FolderData, type editAPIResponse, type RenameResponse, type AddFileResponse } from '../interfaces'

export class FolderTreeFunctions {
    // folderTree has been left out because of the way it returns a parsed array of Nodes

    public static async Rename(path: string, newName: string, currentNode: Node<FolderData>, setCurrentNode: any) {
        try {
            const renameObject: RenameResponse = await editAPI.Rename(path, newName)

            if (!renameObject.result) {
                return renameObject.message
            } else {
                let newNode = new Node<FolderData>(currentNode.data, currentNode.parent, currentNode.children)
                newNode.data.name = newName
                setCurrentNode(newNode)
            }
        } catch (err) {
            return err
        }
    }

    public static async getFile(path: string): Promise<string> {
        try {
            const getFileObject: editAPIResponse
        } catch (err) {
            return err
        }
    }

    // public static async addFile(path: string, fileName: string, parentNode: string, newNode: Node<FolderData>): Promise<Node<FolderData> | string> {
    //     try {
    //         const addFileObject: AddFileResponse = await editAPI.addFile(path, fileName)

    //         if (!addFileObject.result) {
    //             return addFileObject.message
    //         } else {
    //             let newNode = new Node<FolderData>(currentNode.data, currentNode.parent, currentNode.children)
    //             newNode.data.name = newName
    //             setCurrentNode(newNode)
    //         }
    //     } catch (err) {
    //         return err
    //     }
    // }

    public static async Download(paths: string) {
        const result: any = await editAPI.Download(paths)
    }

    // pseudo code for adding a node to the tree:
    // fetch addFile, if it returns success
    // do:
    // find the parent node by its path (recursively traverse the tree)
    // if found, push the new node to the parent's children array
    // return the updated tree
}
