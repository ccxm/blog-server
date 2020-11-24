// 生成用户id
export const createUuid = (len: number = 12): string => {
    let uuid: number[] = []
    for (let i = 0; i < len; i++) {
        const num: number = Math.floor(Math.random() * 10)
        // 第一位不能为0
        if (!i && !num) {
            i = 0
            continue
        }
        uuid[i] = num
    }
    return 'u_' + uuid.join('')
}

// 生成ObjectId
export const createObjectId = (len: number = 12): string => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('')
    let str = '', charsLength = chars.length
    for (let i = 0; i < len; i++) {
        str += chars[Math.floor(Math.random() * charsLength)]
    }
    return str
}

export const createFileId = (): string => {
    return 'f_' + createObjectId()
}

export const createFolderId = (): string => {
    return 'd_' + createObjectId()
}

export const createTagId = (): string => {
    return 't_' + createObjectId()
}

// 生成6位验证码
export const createVerifyCode = (len: number = 6): number => {
    let str: string = ''
    for (let i = 0; i < len; i++) {
        if (!i) {
            str += Math.ceil(Math.random() * 9)
        } else {
            str += Math.floor(Math.random() * 10)
        }
    }
    return parseInt(str)
}

// 验证邮箱
export const testEmail = (email: string, key?: string): string => {
    const reg: RegExp = /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/
    if (reg.test(email)) {
        return ''
    } else {
        return '邮箱格式不正确；'
    }
}

// 验证密码
export const testPassword = (password: string, key?: string): string => {
    const reg: RegExp = /^(\w){6,20}$/
    if (reg.test(password)) {
        return ''
    } else {
        return '密码格式不正确；'
    }
}

// 验证验证码
export const testVerifyCode = (verifyCode: string, key?: string): string => {
    const reg: RegExp = /^[0-9]{6}$/
    if (reg.test(verifyCode)) {
        return ''
    } else {
        return `${key}格式不正确；`
    }
}

// 验证数据库的_id
export const test_id = (_id: string, key?: string): string => {
    const reg: RegExp = /^[0-9a-fA-F]{24}$/
    if (reg.test(_id)) {
        return ''
    } else {
        return `${key}格式不正确，必须为16进制的24位字符串；`
    }
}
