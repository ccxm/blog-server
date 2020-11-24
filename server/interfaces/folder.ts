export interface IFolderBase {
    folderId: string
}

export interface IFolder extends IFolderBase {
    userId: string
}

export interface IDelFolder extends IFolderBase { }

export interface IRenameFolder extends IDelFolder {
    folderName: string
}

export interface INewFolder extends IRenameFolder {
    preId?: string
    fileList?: string
}

export interface IAddChildFolder {
    preId?: string
    folderId: string
}

export interface ICopyFolder {
    sourceFolderId: string
    targetFolderId: string
    userId: string
}

export interface ICutFolder extends ICopyFolder { }