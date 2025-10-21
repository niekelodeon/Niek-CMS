// editRoutes:

// fsServices:
export interface Results {
    success: string []
    failed: string []
}

export interface FolderData {
    path: string,
    name: string,
    type: string,
    depth: number,
}

export class Node<T> {

    constructor(data: T = null, parentNode: Node<T> = null) {
        this.data = data
        this.parent = parentNode
    }

    children: Array<Node<T>>
    parent: Node<T>
    data: T
}

export interface Move { 
    path: string,
    destination: string
}

export interface Delete {
    path: string    
}

export interface Download {
    path: string
}

// fsErrorHandling:
export interface fsError {
    err: string
    msg: string
}

// uploadServices:
export interface UploadResults {
    success: true
    file: string
    func: string
    message: 
            | { success: string [], failed: string [] } 
            | string
}

// ftpServices: 
export interface ftpConfig {
    host: string,
    port: number
    user: string,
    password: string,
    secure: boolean
}

export interface ftpDirectories {
    paths: string []
}

// logger:
export interface LogLevels {
    TRACE: string,
    DEBUG: string,
    INFO: string,
    WARNING: string,
    ERROR: string,
    FATAL: string,
    PURPLE: string,
    RESET: string,
}

// mailServices:
export interface MailTypes {
    resetPassword: { subject: string, text: string },
    resetEmail: { subject: string, text: string },
    deleteAccount: { subject: string, text: string }    
}
