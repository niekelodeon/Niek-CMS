import { parse } from 'flatted'

import { Node, type FolderData } from '../utils/interfaces'

class APIBase {
    public static baseUrl: string = 'http://localhost:8000' // get from env

    public static async fetchData(endpoint: string, method: string, body?: any): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}` + `${endpoint}`, {
                method: method,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: body ? JSON.stringify(body) : undefined,
            })

            return response.text()
        } catch (err) {
            console.error('API fetch error: ', err)
        }
    }
}

export class authAPI {
    public static async Login(email: string, password: string): Promise<boolean | string> {
        const body: any = { email: email, password: password }

        try {
            let response = await APIBase.fetchData('/auth/Login', 'POST', body)

            if (response) {
            }

            return JSON.parse(response)
        } catch (err) {
            return `Route: ${this.Login.name} API fetch error: ${err}`
        }
    }
}

export class editAPI {
    public static async Rename(path: string, newName: string, currentNode: Node<FolderData>, setCurrentNode: any): Promise<boolean | string> {
        const body: any = { path: path, newName: newName }

        try {
            let response = await APIBase.fetchData('/edit/Rename', 'POST', body)

            if (response) {
                let newNode = new Node<FolderData>(currentNode.data, currentNode.parent, currentNode.children)
                newNode.data.name = newName
                setCurrentNode(newNode)
            }

            return JSON.parse(response)
        } catch (err) {
            return `Route: ${this.Rename.name} API fetch error: ${err}`
        }
    }

    public static async folderTree(projectName: string): Promise<Node<FolderData> | string> {
        const body: any = { projectName: projectName }

        try {
            let response = await APIBase.fetchData('/edit/folderTree', 'POST', body)

            response = parse(response)

            return response
        } catch (err) {
            return `Route: ${this.folderTree.name} API fetch error: ${err}`
        }
    }

    public static async getFile(path: string): Promise<string> {
        const body: any = { path: path }

        console.log(body)

        try {
            let response = await APIBase.fetchData('/edit/getFile', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            return `Route: ${this.getFile.name} API fetch error: ${err}`
        }
    }

    public static async saveFile(path: string, editedContent: string, currentNode: Node<FolderData>): Promise<string> {
        const body: any = { path: path, content: editedContent }

        try {
            let response = await APIBase.fetchData('/edit/saveFile', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            return `Route: ${this.saveFile.name} API fetch error: ${err}`
        }
    }

    public static async addFile(path: string, fileName: string): Promise<string> {
        const body: any = { path: path, name: fileName }

        try {
            let response = await APIBase.fetchData('/edit/addFile', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            return `Route: ${this.addFile.name} API fetch error: ${err}`
        }
    }

    public static async Download(paths: string) {
        const body: any = { paths: paths }

        try {
            let response = await APIBase.fetchData('/edit/Download', 'POST', body)

            console.log(JSON.parse(response))

            return JSON.parse(response)
        } catch (err) {
            return `Route: ${this.Rename.name} API fetch error: ${err}`
        }
    }
}
