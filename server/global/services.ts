import path from 'path'

export class GlobalServices {

    public static filePath (dirname: string, filename: string) {
        const filePath: string = (path.basename(dirname) + "/" +  path.basename(filename))
        return filePath
    }

}