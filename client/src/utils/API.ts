import { parse } from "flatted"

import type { Node, FolderData } from "../utils/interfaces"

class APIBase {

    public static baseUrl: string = "http://localhost:8000" // get from env 

    public static async fetchData (endpoint: string, method: string, body?: any): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}` + `${endpoint}`, {
                method: method,
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: body ? JSON.stringify(body) : undefined
            })  

            return response.text()
        } catch (err) {
            console.error("API fetch error: ", err)
        } 
    }
}

export class editAPI {

    public static async folderTree (projectName: string): Promise<Node<FolderData> | string> {     
        const body: any = { projectName: projectName }

        try {
            let response = await APIBase.fetchData("/edit/folderTree", "POST", body)

            response = parse(response)

            return response 
        } catch (err) {
            return `Route: ${this.folderTree.name} API fetch error: ${err}`
        }
    }

    public static async getFile (path: string): Promise<string> {
        const body: any = { path: path }

        console.log(body)

        try {
            let response = await APIBase.fetchData("/edit/getFile", "POST", body)

            return JSON.parse(response)
        } catch (err) {
            return `Route: ${this.getFile.name} API fetch error: ${err}`
        }
    }

    public static async saveFile (path: string, editedContent: string): Promise<string> {
        const body: any = { path: path, content: editedContent }

        try {
            let response = await APIBase.fetchData("/edit/saveFile", "POST", body)

            return JSON.parse(response)
        } catch (err) {
            return `Route: ${this.saveFile.name} API fetch error: ${err}`
        }
    }

    public static async addFile (path: string, fileName: string): Promise<string> {
        const body: any = { path: path, name: fileName }

        try {
            let response = await APIBase.fetchData("/edit/addFile", "POST", body)

            return JSON.parse(response)
        } catch (err) {
            return `Route: ${this.addFile.name} API fetch error: ${err}`
        }
    }

    // addFolder should be here

    public static async Rename (path: string, newName: string): Promise<boolean | string> {

        const body: any = { path: path, newName: newName }

        //console.log(body)

        try {
            let response = await APIBase.fetchData("/edit/Rename", "POST", body)

            console.log(JSON.parse(response))

            return JSON.parse(response)
        } catch (err) {
            return `Route: ${this.Rename.name} API fetch error: ${err}`
        }

    }



}    
