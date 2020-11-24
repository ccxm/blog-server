/**
 * @api {post} /trash/restore-folder    还原文件夹
 * @apiVersion 1.0.0
 * @apiName RestoreFolder
 * @apiGroup Trash
 * @apiHeader {String} Authorization token
 *
 * @apiParam {String} folderId         文件夹的id
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "folderId": "d_ogafytab13k5"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 */

/**
* @api {post} /trash/restore-file       还原文件
* @apiVersion 1.0.0
* @apiName RestoreFile
* @apiGroup Trash
* @apiHeader {String} Authorization token
*
* @apiParam {String} folderId         文件夹的id
* @apiParam {String} fileId           文件的id
*
* @apiParamExample {json} Request-Example:
* {
*    "fileId": "f_s8jzh3mgujgu",
*    "folderId": "d_ogafytab13k5",
* }
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {}
*/

/**
 * @api {delete} /trash/folder        删除文件夹
 * @apiVersion 1.0.0
 * @apiName DeleteFolder
 * @apiGroup Trash
 * @apiHeader {String} Authorization token
 *
 * @apiParam {String} folderId         文件夹的id
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "folderId": "d_ogafytab13k5"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 */

/**
* @api {delete} /trash/file           删除文件
* @apiVersion 1.0.0
* @apiName DeleteFile
* @apiGroup Trash
* @apiHeader {String} Authorization token
*
* @apiParam {String} fileId           文件的id
*
* @apiParamExample {json} Request-Example:
* {
*    "fileId": "f_s8jzh3mgujgu",
* }
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {}
*/

/**
* @api {post} /trash/clear            清空回收站
* @apiVersion 1.0.0
* @apiName ClearTrash
* @apiGroup Trash
* @apiHeader {String} Authorization token
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {}
*/
