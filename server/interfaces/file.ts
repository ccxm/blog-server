import { IRestoreFile } from './trash'
export interface IFileBase {
    folderId: string
    fileId: string
}

export interface IFile extends IFileBase {
    userId: string
}

export interface INewFile {
    folderId: string
    fileName: string
    fileId: string
    userId: string
}

export interface IUpdateFile {
    folderId: string
    fileId: string
    fileContent: string
    userId: string
}

export interface IRenameFile {
    userId: string
    folderId: string
    fileId: string
    newFileName: string
}

export interface IDeleteFile {
    userId: string
    fileId: string
    folderId?: string
}

export interface ICopyFile {
    userId: string
    sourceFolderId: string
    targetFolderId: string
    fileId: string
    fileName?: string
}

export interface IUpdateFileMsg {
    params: IRenameFile | IDeleteFile | IRestoreFile
    condition: object
    errCode: object
}

export interface IPageView {
    fileId: string
}