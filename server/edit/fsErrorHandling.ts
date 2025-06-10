import { fsError }  from '../global/interfaces'

export class errorHandling {
    
    public static async getSpecificError (error: string): Promise<any> {
        //const errorClass = errorMapping[error]

        if (errorMapping[error]) return new errorMapping[error]()
        else return error
    }
    
}

class FileNotExists implements fsError {
    err = this.constructor.name
    msg = "Path does not exist"
}

class FileAlreadyExists implements fsError {
    err = this.constructor.name
    msg = "File already exists"
}

class DirectoryNotExists implements fsError {
    err = this.constructor.name
    msg = "Folder does not exist"
}

class DirectoryAlreadyExists implements fsError {
    err = this.constructor.name
    msg = "Folder already exists"
}

class NameTooLong implements fsError {
    err = this.constructor.name
    msg = "File / folder name too long"
}

class NoPermission implements fsError {
    err = this.constructor.name
    msg = "File / folder needs permission"
}

class ReadOnly implements fsError {
    err = this.constructor.name
    msg = "File / folder is read only"
}

class NeedFile implements fsError {
    err = this.constructor.name
    msg = "File needed not directory"
}

class FileNotWritable implements fsError {
    err = this.constructor.name
    msg = "File not writable"
}

class DirectoryNotWritable implements fsError {
    err = this.constructor.name
    msg = "Folder not writable"
}

class FileNotReadable implements fsError {
    err = this.constructor.name
    msg = "File not readable"
}

class DirectoryNotReadable implements fsError {
    err = this.constructor.name
    msg = "Folder not readable"
}

const errorMapping: any = {
    // common fs errors:
    ENOENT: FileNotExists,
    ENOTDIR: DirectoryNotExists,
    EEXISTS: FileAlreadyExists,
    ENOTEMPTY: DirectoryAlreadyExists,
    ENAMETOOLONG: NameTooLong,
    EACCES: NoPermission,
    EPERM: NoPermission,
    EROFS: ReadOnly,
    EISDIR: NeedFile,
        
    // common fs-extra errors:
    ERR_FILE_NOT_FOUND: FileNotExists,
    ERR_DIR_NOT_FOUND: DirectoryNotExists,
    ERR_FILE_ALREADY_EXISTS: FileAlreadyExists,
    ERR_DIR_ALREADY_EXISTS: DirectoryAlreadyExists,
    ERR_FILE_NOT_READABLE: FileNotReadable,
    ERR_FILE_NOT_WRITABLE: FileNotWritable,
    ERR_DIR_NOT_READABLE: DirectoryNotReadable,
    ERR_DIR_NOT_WRITABLE: DirectoryNotWritable
}
