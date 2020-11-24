// 详细信息
export interface IUserInfo {
    nickName: string
    avatarUrl: string
    tempUrl: string
}

export interface IUser {
    userId: string
    email: string
    password?: string
    nickName?: string
    userInfo?: IUserInfo
    folderList?: Array<any>
}

export interface IStatistics {
    articleNum: number
    sortNum: number
    tagNum?: number
}