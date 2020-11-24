import * as fs from 'fs'
import * as path from 'path'
import { CONFIG } from './../config/config'
import { NextFunction } from 'express'
import { IFsFunction, IFsFileFunction } from './../interfaces/functions'
import { createFileId } from './../utils/utils'
export class FS {
    public basePath: string = path.resolve(__dirname, CONFIG.STORAGE_PATH)
    static instance: FS
    constructor() {

    }

    static getInstance(): FS {
        if (!FS.instance) {
            FS.instance = new FS()
        }
        return FS.instance
    }

    writeFile: IFsFileFunction = (data, srcId, userId, next) => {
        return new Promise(resolve => {
            fs.writeFile(this.getPath(srcId, userId), data, (err) => {
                this.callback(err, resolve, next)
            })
        })
    }


    mkdir: IFsFunction = (srcId, userId, next) => {
        return new Promise(resolve => {
            fs.mkdir(this.getPath(srcId, userId), { recursive: true }, (err) => {
                console.log(srcId, userId)
                this.callback(err, resolve, next)
            })
        })
    }

    rmdir: IFsFunction = (srcId, userId, next) => {
        return new Promise(resolve => {
            fs.rmdir(this.getPath(srcId, userId), { recursive: true }, (err) => {
                this.callback(err, resolve, next)
            })
        })
    }

    renameDir = (oldSrc: string, newSrc: string, userId: string, next: NextFunction) => {
        return new Promise(resolve => {
            fs.rename(this.getPath(oldSrc, userId), this.getPath(newSrc, userId), (err) => {
                this.callback(err, resolve, next)
            })
        })
    }

    copyFile = (sourceFileId: string, targetFileId: string, userId: string, next: NextFunction) => {
        return new Promise(resolve => {
            fs.copyFile(this.getPath(sourceFileId, userId), this.getPath(targetFileId, userId), err => {
                this.callback(err, resolve, next)
            })
        })
    }

    renameFile = (sourceFileId: string, targetFileId: string, userId: string, next: NextFunction) => {
        return new Promise(resolve => {
            fs.rename(this.getPath(sourceFileId, userId), this.getPath(targetFileId, userId), err => {
                this.callback(err, resolve, next)
            })
        })
    }

    unlink = (file: string, userId: string, next: NextFunction) => {
        return new Promise(resolve => {
            fs.unlink(this.getPath(file, userId), err => {
                this.callback(err, resolve, next)
            })
        })
    }

    copyFolder = async (sourceFolderId: string, newFolderId: string, userId: string, oldFileList: Array<any>, next: NextFunction) => {
        if (!await this.mkdir(newFolderId, userId, next)) {
            return
        }
        return new Promise(async resolve => {
            const arr: Array<object> = []
            for (let i = 0; i < oldFileList.length; i++) {
                const fileId: string = createFileId()
                try {
                    if (!await this.copyFile(`${sourceFolderId}//${oldFileList[i].fileId}.md`,
                        `${newFolderId}//${fileId}.md`, userId, next)) {
                        resolve(false)
                        return
                    }
                } catch (err) {
                    this.callback(err, resolve, next)
                    return
                }
                arr.push({
                    fileId,
                    fileName: oldFileList[i].fileName,
                    userId,
                    folderId: newFolderId
                })
            }
            resolve(arr)
        })
    }

    private copyDir = async (source: string, target: string, arr: Array<object> = [], cb = (error?: any, fileList?: Array<object>) => { }, isCall: boolean = false) => {
        const stat: fs.Stats = fs.lstatSync(source)
        console.log('10')
        if (stat.isDirectory()) {
            console.log('20')
            // fs.readdir(source, 'utf-8', (err, fileList) => {
            //     if (err) {
            //         isCall = true
            //         return cb(err)
            //     } else {
            //         fileList.forEach(file => {
            //             this.copyDir(`${source}/${file}`, target, arr, cb, true)
            //         })
            //     }
            // })
            try {
                const fileList = fs.readdirSync(source, 'utf-8')
                fileList.forEach(file => {
                    this.copyDir(`${source}/${file}`, target, arr, cb, true)
                })
            } catch (err) {
                isCall = true
                return cb(err)
            }
        } else {
            const fileId: string = createFileId()
            const fileName: string = source.substring(source.lastIndexOf('/'), source.length - 3)
            arr.push({
                fileId,
                fileName
            })
            console.log('1', arr)
            fs.writeFileSync(`${target}//${fileId}.md`, fs.readFileSync(source))
        }
        console.log('30')
        if (!isCall) {
            console.log('2', arr)
            cb(null, arr)
        }
    }

    private getPath(src: string, userId: string): string {
        return `${this.basePath}//${userId}//${src}`
    }

    private callback(err: any, resolve: any, next: any) {
        if (err) {
            next(err)
            resolve(false)
        } else {
            resolve(true)
        }
    }
}

export const ofs: FS = FS.getInstance()

