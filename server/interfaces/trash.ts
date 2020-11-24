export interface IRestoreFolder {
    folderId: string
    userId: string
}

export interface IRestoreFile {
    fileId: string
    userId: string
    folderId: string
}

export interface IDelFolder {
    folderId: string
    userId: string
}

export interface IDelFile {
    fileId: string
    userId: string
}