/**
 * @api {post} /file/new-file       新建文件
 * @apiVersion 1.0.0
 * @apiName NewFile
 * @apiGroup File
 * @apiHeader {String} Authorization token
 *
 * @apiParam {String} folderId         文件夹的id
 * @apiParam {String} fileName         文件名
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "fileName": "test",
 *    "folderId": "1234567891012"
 * }
 *
 * @apiSuccess {String} folderName      文件夹名字
 * @apiSuccess {String} folderId        文件夹id
 * @apiSuccess {String} [preId]         父文件的id，如果在根目录下则没有返回
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "folderName": "test",
 *    "folderId": "1234567891012",
 *    "preId": "1234567891012"
 * }
 */

/**
* @api {put} /file/file               更新文件
* @apiVersion 1.0.0
* @apiName UpdateFile
* @apiGroup File
* @apiHeader {String} Authorization token
*
* @apiParam {String} folderId         文件夹的id
* @apiParam {String} fileId           文件的id
* @apiParam {String} fileContent      文件的内容
*
* @apiParamExample {json} Request-Example:
* {
*    "fileId": "by4411zn6i4n",
*    "folderId": "1234567891012",
*    "fileContent": "# title"
* }
*
* @apiSuccess {String} folderName      文件夹名字
* @apiSuccess {String} folderId        文件夹id
* @apiSuccess {String} [preId]         父文件的id，如果在根目录下则没有返回
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
*    "folderName": "test",
*    "folderId": "1234567891012",
*    "preId": "1234567891012"
* }
*/

/**
* @api {post} /file/rename             重命名文件
* @apiVersion 1.0.0
* @apiName RenameFile
* @apiGroup File
* @apiHeader {String} Authorization token
*
* @apiParam {String} folderId         文件夹的id
* @apiParam {String} fileId           文件的id
* @apiParam {String} newFileName      新文件名
*
* @apiParamExample {json} Request-Example:
* {
*    "fileId": "by4411zn6i4n",
*    "folderId": "1234567891012",
*    "newFileName": "test1"
* }
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {}
*/

/**
* @api {delete} /file/file             删除文件
* @apiVersion 1.0.0
* @apiName DeleteFile
* @apiGroup File
* @apiHeader {String} Authorization token
*
* @apiParam {String} folderId         文件夹的id
* @apiParam {String} fileId           文件的id
*
* @apiParamExample {json} Request-Example:
* {
*    "fileId": "by4411zn6i4n",
*    "folderId": "1234567891012",
* }
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {}
*/

/**
* @api {post} /file/copy             复制文件
* @apiVersion 1.0.0
* @apiName CopyFile
* @apiGroup File
* @apiHeader {String} Authorization token
*
* @apiParam {String} sourceFolderId         原文件夹的id
* @apiParam {String} targetFolderId         目标文件夹的id
* @apiParam {String} fileId                 文件的id
*
* @apiParamExample {json} Request-Example:
* {
*    "fileId": "by4411zn6i4n",
*    "sourceFolderId": "by4411zn6i4n",
*    "targetFolderId": "by4411zn6i4n",
* }
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {}
*/

/**
* @api {post} /file/cut                     剪切文件
* @apiVersion 1.0.0
* @apiName CutFile
* @apiGroup File
* @apiHeader {String} Authorization token
*
* @apiParam {String} sourceFolderId         原文件夹的id
* @apiParam {String} targetFolderId         目标文件夹的id
* @apiParam {String} fileId                 文件的id
*
* @apiParamExample {json} Request-Example:
* {
*    "fileId": "by4411zn6i4n",
*    "sourceFolderId": "by4411zn6i4n",
*    "targetFolderId": "by4411zn6i4n",
* }
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {}
*/