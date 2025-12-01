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

// Edit:
export interface editAPIResponse {
    result: boolean
    message: string
}

export interface RenameResponse {
    result: boolean
    message: string
}

export interface AddFileResponse {
    result: boolean
    message: string
}

// Authentication:
// combine into one
export interface LoginResponse {
    result: boolean
    message?: string
    token?: string
}

export interface RegisterResponse {
    result: boolean
    message?: string
    token?: string
}

// combine into one
export interface ForgotResponse {
    result: boolean
    message: string
}

export interface ResetResponse {
    result: boolean
    message: string
}
