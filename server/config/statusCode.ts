/**
 * 状态码
 * 2：user
 */
export const statusCode = Object.freeze({
    SUCCESS: {
        code: 10000,
        msg: '成功'
    },
    UNAUTHORIZED: {
        code: 49999,
        msg: 'token不存在或者已过期，请重新登录'
    },
    ILLEGAL_VALUE: {
        code: 40099,
        msg: '请求的值不合法'
    },
    EMPTY_PARAM: {
        code: 40009,
        msg: '请求参数不正确，请校验'
    },
    FAIL: {
        code: 40999,
        msg: '请求失败'
    },
    UNKNOW: {
        code: 99999,
        msg: '发生未知错误，请重试'
    },
    LOGIN_FAIL: {
        code: 20001,
        msg: '账号或密码不正确，请重试'
    },
    EMAIL_BEEN_USED: {
        code: 20002,
        msg: '该邮箱已被注册'
    },
    NICKNAME_BEEN_USED: {
        code: 20003,
        msg: '该昵称已被注册'
    },
    update_visitor_page_view_err: {
        code: 20004,
        msg: '该用户不存在，更新浏览量失败'
    },
    get_visitor_page_view_err: {
        code: 20005,
        msg: '该用户不存在，获取浏览量失败'
    },
    NEW_FOLDER_ERR: {
        code: 30001,
        msg: '用户不存在，新建文件夹失败'
    },
    ADD_CHILD_FOLDER_ERR: {
        code: 30002,
        msg: '上一级文件不存在，新建文件夹失败'
    },
    FIND_FOLDER_LIST_NULL: {
        code: 30003,
        msg: '用户不存在，查找文件失败'
    },
    FOLDER_NAME_IS_EXISTED: {
        code: 30004,
        msg: '该文件夹名已经存在'
    },
    RENAME_FOLDER_ERR: {
        code: 30005,
        msg: '该文件夹不存在，重命名失败'
    },
    DEL_FOLDER_ERR: {
        code: 30006,
        msg: '该文件夹不存在，删除文件夹失败'
    },
    folder_move_to_trash_err: {
        code: 30007,
        msg: '该文件夹不存在，删除文件夹失败'
    },
    find_folder_err: {
        code: 30008,
        msg: '该文件夹不存在，复制文件夹失败'
    },
    copy_folder_err: {
        code: 30009,
        msg: '用户不存在，复制文件夹失败'
    },
    cut_folder_err: {
        code: 30010,
        msg: '该文件夹不存在，剪切文件夹失败'
    },
    find_target_folder_err: {
        code: 40001,
        msg: '该目标文件夹不存在，新建文件失败'
    },
    find_file_in_folder_err: {
        code: 40002,
        msg: '该文件不存在，更新文件失败'
    },
    update_name_in_folder_err: {
        code: 40003,
        msg: '该文件不存在，重命名失败'
    },
    update_name_in_file_err: {
        code: 40004,
        msg: '该文件不存在，重命名失败'
    },
    delete_file_in_folder_err: {
        code: 40005,
        msg: '该文件不存在，删除文件失败'
    },
    find_file_err: {
        code: 40006,
        msg: '该文件不存在，复制文件失败'
    },
    cut_file_null: {
        code: 40007,
        msg: '该文件不存在，剪切文件失败'
    },
    delete_file_from_folder_err: {
        code: 40008,
        msg: '该文件不存在，剪切文件失败'
    },
    update_page_view_err: {
        code: 40008,
        msg: '该文件不存在，更新浏览量失败'
    },
    find_file_detail_err: {
        code: 40008,
        msg: '该文件不存在，获取文章详情失败'
    },
    update_file_image_err: {
        code: 40009,
        msg: '该文件不存在，更新文件图片失败'
    },
    restore_folder_err: {
        code: 50001,
        msg: '该文件夹不存在，还原文件夹失败'
    },
    restore_file_err: {
        code: 50002,
        msg: '该文件不存在，还原文件失败'
    },
    delete_folder_from_trash_err: {
        code: 50003,
        msg: '该文件夹不存在，从回收站删除文件夹失败'
    },
    delete_file_from_trash_err: {
        code: 50004,
        msg: '该文件不存在，从回收站删除文件失败'
    },
    find_folder_in_delete_err: {
        code: 50005,
        msg: '该文件夹不存在，从回收站删除文件夹失败'
    },
    delete_folder_from_db_err: {
        code: 50006,
        msg: '这些文件夹不存在，从回收站删除文件夹失败'
    },
    delete_file_from_db_err: {
        code: 50007,
        msg: '这些文件不存在，从回收站删除文件失败'
    },
    clear_trash_err: {
        code: 50008,
        msg: '用户不存在，清空回收站失败'
    },
    tag_is_existed: {
        code: 60001,
        msg: '该标签已存在，请重试'
    },
    new_tag_error: {
        code: 60002,
        msg: '用户不存在，新增标签失败'
    },
    find_tag_error: {
        code: 60003,
        msg: '用户不存在，查找标签失败'
    }
})
