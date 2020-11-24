export interface ITag {
    tagId: string
    tagName: string
}

export interface IUpdateTag {
    userId: string
    tagList: Array<string>
    fileId: string
    isDel?: boolean
}

export interface IUpdateFileList {
    folderId: string
    fileId: string
    userId: string
    isDel?: boolean
}

export interface IUpdateFolderList {
    folderId: string
    userId: string
    isDel?: boolean
}