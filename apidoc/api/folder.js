/**
 * @api {post} /folder/new-folder   新建文件夹
 * @apiVersion 1.0.0
 * @apiName NewFolder
 * @apiGroup Folder
 * @apiHeader {String} Authorization token
 *
 * @apiParam {String} folderName     文件夹名字
 * @apiParam {String} [preId]        父文件的id，如果在根目录下则不用传
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "folderName": "test",
 *    "preId": "1234567891012"
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
* @api {get} /folder/folder-list   获取文件夹列表
* @apiVersion 1.0.0
* @apiName GetFolderList
* @apiGroup Folder
* @apiHeader {String} Authorization token
*
* @apiSuccess {String} folderName      文件夹名字
* @apiSuccess {String} folderId        文件夹id
* @apiSuccess {String} [preId]         父文件的id，如果在根目录下则没有返回
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {}
*/

/**
 * @api {put} /folder/rename   重命名文件夹
 * @apiVersion 1.0.0
 * @apiName renameFolder
 * @apiGroup Folder
 * @apiHeader {String} Authorization token
 *
 * @apiParam {String} folderName     文件夹名字
 * @apiParam {String} folderId       文件夹id
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "folderName": "test",
 *    "preId": "1234567891012"
 * }
 *
 * @apiSuccess {String} folderName      文件夹名字
 * @apiSuccess {String} folderId        文件夹id
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "folderName": "test",
 *    "folderId": "1234567891012",
 * }
 */

/**
* @api {delete} /folder/folder         删除文件夹
* @apiVersion 1.0.0
* @apiName deleteFolder
* @apiGroup Folder
* @apiHeader {String} Authorization token
*
* @apiParam {String} folderId       文件夹id
*
* @apiParamExample {json} Request-Example:
* {
*    "folderId": "1234567891012",
* }
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {}
*/

/**
* @api {post} /folder/copy                复制文件夹
* @apiVersion 1.0.0
* @apiName CopyFolder
* @apiGroup Folder
* @apiHeader {String} Authorization token
*
* @apiParam {String} sourceFolderId       源文件夹id
* @apiParam {String} [targetFolderId]     目标文件夹id，不传的时候为根目录
* @apiParamExample {json} Request-Example:
* {
*    "sourceFolderId": "d_by4411zn6i4n",
*    "targetFolderId": "d_by4411zn6i4n",
* }
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {}
*/

/**
* @api {post} /folder/cut                 剪切文件夹
* @apiVersion 1.0.0
* @apiName CutFolder
* @apiGroup Folder
* @apiHeader {String} Authorization token
*
* @apiParam {String} sourceFolderId       源文件夹id
* @apiParam {String} [targetFolderId]     目标文件夹id，不传的时候为根目录
* @apiParamExample {json} Request-Example:
* {
*    "sourceFolderId": "d_by4411zn6i4n",
*    "targetFolderId": "d_by4411zn6i4n"
* }
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {}
*/