// import { useTreeStore } from '../store'

import { editAPI } from '../API'

import type { Node, FolderData } from '../interfaces'

// const folderTree: Node<FolderData> = useTreeStore((state) => state.folderTree)
// console.log(folderTree, "folderTree from TreeFunctions")

export class FolderTreeFunctions {
    // public static async Rename(path: string, newName: string, currentNode: Node<FolderData>) {
    //     const result: any = await editAPI.Rename(path, newName)

    //     if (!result.result) {
    //         // dont change the node
    //         return false
    //     } else {
    //         currentNode.data.name = newName
    //         // renaming the node
    //         return true
    //     }
    // }

    public static async addFile(path: string, fileName: string, folderTree: Node<FolderData>, parentNode: string, newNode: Node<FolderData>): Promise<Node<FolderData> | string> {
        console.log(path, fileName, 'log')
        const result: any = await editAPI.addFile(path, fileName)

        if (!result.success) {
            return `Error adding file: ${result.message}`
        } else {
            // find parent node
            // add new node to parent's children array
            // update store with new tree

            return `Success adding file: ${result.message}`
        }
    }

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
