"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ofs = exports.FS = void 0;
const fs = require("fs");
const path = require("path");
const config_1 = require("./../config/config");
const utils_1 = require("./../utils/utils");
class FS {
    constructor() {
        this.basePath = path.resolve(__dirname, config_1.CONFIG.STORAGE_PATH);
        this.writeFile = (data, srcId, userId, next) => {
            return new Promise(resolve => {
                fs.writeFile(this.getPath(srcId, userId), data, (err) => {
                    this.callback(err, resolve, next);
                });
            });
        };
        this.mkdir = (srcId, userId, next) => {
            return new Promise(resolve => {
                fs.mkdir(this.getPath(srcId, userId), { recursive: true }, (err) => {
                    console.log(srcId, userId);
                    this.callback(err, resolve, next);
                });
            });
        };
        this.rmdir = (srcId, userId, next) => {
            return new Promise(resolve => {
                fs.rmdir(this.getPath(srcId, userId), { recursive: true }, (err) => {
                    this.callback(err, resolve, next);
                });
            });
        };
        this.renameDir = (oldSrc, newSrc, userId, next) => {
            return new Promise(resolve => {
                fs.rename(this.getPath(oldSrc, userId), this.getPath(newSrc, userId), (err) => {
                    this.callback(err, resolve, next);
                });
            });
        };
        this.copyFile = (sourceFileId, targetFileId, userId, next) => {
            return new Promise(resolve => {
                fs.copyFile(this.getPath(sourceFileId, userId), this.getPath(targetFileId, userId), err => {
                    this.callback(err, resolve, next);
                });
            });
        };
        this.renameFile = (sourceFileId, targetFileId, userId, next) => {
            return new Promise(resolve => {
                fs.rename(this.getPath(sourceFileId, userId), this.getPath(targetFileId, userId), err => {
                    this.callback(err, resolve, next);
                });
            });
        };
        this.unlink = (file, userId, next) => {
            return new Promise(resolve => {
                fs.unlink(this.getPath(file, userId), err => {
                    this.callback(err, resolve, next);
                });
            });
        };
        this.copyFolder = (sourceFolderId, newFolderId, userId, oldFileList, next) => __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.mkdir(newFolderId, userId, next))) {
                return;
            }
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const arr = [];
                for (let i = 0; i < oldFileList.length; i++) {
                    const fileId = utils_1.createFileId();
                    try {
                        if (!(yield this.copyFile(`${sourceFolderId}//${oldFileList[i].fileId}.md`, `${newFolderId}//${fileId}.md`, userId, next))) {
                            resolve(false);
                            return;
                        }
                    }
                    catch (err) {
                        this.callback(err, resolve, next);
                        return;
                    }
                    arr.push({
                        fileId,
                        fileName: oldFileList[i].fileName,
                        userId,
                        folderId: newFolderId
                    });
                }
                resolve(arr);
            }));
        });
        this.copyDir = (source, target, arr = [], cb = (error, fileList) => { }, isCall = false) => __awaiter(this, void 0, void 0, function* () {
            const stat = fs.lstatSync(source);
            console.log('10');
            if (stat.isDirectory()) {
                console.log('20');
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
                    const fileList = fs.readdirSync(source, 'utf-8');
                    fileList.forEach(file => {
                        this.copyDir(`${source}/${file}`, target, arr, cb, true);
                    });
                }
                catch (err) {
                    isCall = true;
                    return cb(err);
                }
            }
            else {
                const fileId = utils_1.createFileId();
                const fileName = source.substring(source.lastIndexOf('/'), source.length - 3);
                arr.push({
                    fileId,
                    fileName
                });
                console.log('1', arr);
                fs.writeFileSync(`${target}//${fileId}.md`, fs.readFileSync(source));
            }
            console.log('30');
            if (!isCall) {
                console.log('2', arr);
                cb(null, arr);
            }
        });
    }
    static getInstance() {
        if (!FS.instance) {
            FS.instance = new FS();
        }
        return FS.instance;
    }
    getPath(src, userId) {
        return `${this.basePath}//${userId}//${src}`;
    }
    callback(err, resolve, next) {
        if (err) {
            next(err);
            resolve(false);
        }
        else {
            resolve(true);
        }
    }
}
exports.FS = FS;
exports.ofs = FS.getInstance();
//# sourceMappingURL=fs.js.map