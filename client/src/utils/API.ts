import { parse } from 'flatted'

import { Node, type FolderData, type LoginResponse, type RegisterResponse, type ForgotResponse, type ResetResponse, type RenameResponse, type AddFileResponse } from '../utils/interfaces'
import type { editAPIResponse } from '../utils/interfaces'

class APIBase {
    public static baseUrl: string = 'http://localhost:8000'

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
            return 'Something went wrong. If it keeps happening, contact the admin.'
        }
    }
}

export class authAPI {
    public static async Register(email: string, password: string): Promise<RegisterResponse> {
        const body: any = { email: email, password: password }

        try {
            let response = await APIBase.fetchData('/auth/register', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error('API fetch error: ', err)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async Login(email: string, password: string): Promise<LoginResponse> {
        const body: any = { email: email, password: password }

        try {
            let response = await APIBase.fetchData('/auth/login', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error('API fetch error: ', err)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async Forgot(email: string): Promise<ForgotResponse> {
        const body: any = { email: email }

        try {
            let response = await APIBase.fetchData('/auth/forgot', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error('API fetch error: ', err)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async Reset(token: string, password: string): Promise<ResetResponse> {
        const body: any = { token: token, password: password }

        try {
            let response = await APIBase.fetchData('/auth/reset', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error('API fetch error: ', err)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }
}

export class editAPI {
    public static async folderTree(projectName: string): Promise<string> {
        const body: any = { projectName: projectName }

        try {
            let response = await APIBase.fetchData('/edit/folderTree', 'POST', body)

            response = parse(response)

            return response
        } catch (err) {
            console.error('API fetch error: ', err)
            return err
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

    public static async Rename(path: string, newName: string): Promise<RenameResponse> {
        const body: any = { path: path, newName: newName }

        try {
            let response = await APIBase.fetchData('/edit/Rename', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error(`Route: ${this.Rename.name} API fetch error: ${err}`)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async addFile(path: string, fileName: string): Promise<AddFileResponse> {
        const body: any = { path: path, name: fileName }

        try {
            let response = await APIBase.fetchData('/edit/addFile', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error(`Route: ${this.addFile.name} API fetch error: ${err}`)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
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
