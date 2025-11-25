// FolderTree:
export interface FolderData {
    path: string
    name: string
    type: string
    depth: number
}

export class Node<T> {
    constructor(data: T = null, parentNode: Node<T> = null, children: Array<Node<T>> = null) {
        this.data = data
        this.parent = parentNode
        this.children = children
    }

    styling: HTMLDivElement
    children: Array<Node<T>>
    parent: Node<T>
    data: T
}

export interface FolderTreeMethods {
    RENAME: string
    ADD: string
    MOVE: string
    DELETE: string
}

// Authentication:
export interface LoginResponse {
    result: boolean
    message?: string
    token?: string
}
