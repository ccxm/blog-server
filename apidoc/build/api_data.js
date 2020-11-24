define({ "api": [
  {
    "type": "post",
    "url": "/file/copy",
    "title": "复制文件",
    "version": "1.0.0",
    "name": "CopyFile",
    "group": "File",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sourceFolderId",
            "description": "<p>原文件夹的id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "targetFolderId",
            "description": "<p>目标文件夹的id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileId",
            "description": "<p>文件的id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"fileId\": \"by4411zn6i4n\",\n   \"sourceFolderId\": \"by4411zn6i4n\",\n   \"targetFolderId\": \"by4411zn6i4n\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/file.js",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/file/copy"
      }
    ]
  },
  {
    "type": "post",
    "url": "/file/cut",
    "title": "剪切文件",
    "version": "1.0.0",
    "name": "CutFile",
    "group": "File",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sourceFolderId",
            "description": "<p>原文件夹的id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "targetFolderId",
            "description": "<p>目标文件夹的id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileId",
            "description": "<p>文件的id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"fileId\": \"by4411zn6i4n\",\n   \"sourceFolderId\": \"by4411zn6i4n\",\n   \"targetFolderId\": \"by4411zn6i4n\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/file.js",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/file/cut"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/file/file",
    "title": "删除文件",
    "version": "1.0.0",
    "name": "DeleteFile",
    "group": "File",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹的id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileId",
            "description": "<p>文件的id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"fileId\": \"by4411zn6i4n\",\n   \"folderId\": \"1234567891012\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/file.js",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/file/file"
      }
    ]
  },
  {
    "type": "post",
    "url": "/file/new-file",
    "title": "新建文件",
    "version": "1.0.0",
    "name": "NewFile",
    "group": "File",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹的id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileName",
            "description": "<p>文件名</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"fileName\": \"test\",\n   \"folderId\": \"1234567891012\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>文件夹名字</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "preId",
            "description": "<p>父文件的id，如果在根目录下则没有返回</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"folderName\": \"test\",\n   \"folderId\": \"1234567891012\",\n   \"preId\": \"1234567891012\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/file.js",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/file/new-file"
      }
    ]
  },
  {
    "type": "post",
    "url": "/file/rename",
    "title": "重命名文件",
    "version": "1.0.0",
    "name": "RenameFile",
    "group": "File",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹的id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileId",
            "description": "<p>文件的id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newFileName",
            "description": "<p>新文件名</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"fileId\": \"by4411zn6i4n\",\n   \"folderId\": \"1234567891012\",\n   \"newFileName\": \"test1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/file.js",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/file/rename"
      }
    ]
  },
  {
    "type": "put",
    "url": "/file/file",
    "title": "更新文件",
    "version": "1.0.0",
    "name": "UpdateFile",
    "group": "File",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹的id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileId",
            "description": "<p>文件的id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileContent",
            "description": "<p>文件的内容</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"fileId\": \"by4411zn6i4n\",\n   \"folderId\": \"1234567891012\",\n   \"fileContent\": \"# title\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>文件夹名字</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "preId",
            "description": "<p>父文件的id，如果在根目录下则没有返回</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"folderName\": \"test\",\n   \"folderId\": \"1234567891012\",\n   \"preId\": \"1234567891012\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/file.js",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/file/file"
      }
    ]
  },
  {
    "type": "post",
    "url": "/folder/copy",
    "title": "复制文件夹",
    "version": "1.0.0",
    "name": "CopyFolder",
    "group": "Folder",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sourceFolderId",
            "description": "<p>源文件夹id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "targetFolderId",
            "description": "<p>目标文件夹id，不传的时候为根目录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"sourceFolderId\": \"d_by4411zn6i4n\",\n   \"targetFolderId\": \"d_by4411zn6i4n\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/folder.js",
    "groupTitle": "Folder",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/folder/copy"
      }
    ]
  },
  {
    "type": "post",
    "url": "/folder/cut",
    "title": "剪切文件夹",
    "version": "1.0.0",
    "name": "CutFolder",
    "group": "Folder",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sourceFolderId",
            "description": "<p>源文件夹id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "targetFolderId",
            "description": "<p>目标文件夹id，不传的时候为根目录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"sourceFolderId\": \"d_by4411zn6i4n\",\n   \"targetFolderId\": \"d_by4411zn6i4n\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/folder.js",
    "groupTitle": "Folder",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/folder/cut"
      }
    ]
  },
  {
    "type": "get",
    "url": "/folder/folder-list",
    "title": "获取文件夹列表",
    "version": "1.0.0",
    "name": "GetFolderList",
    "group": "Folder",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>文件夹名字</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "preId",
            "description": "<p>父文件的id，如果在根目录下则没有返回</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/folder.js",
    "groupTitle": "Folder",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/folder/folder-list"
      }
    ]
  },
  {
    "type": "post",
    "url": "/folder/new-folder",
    "title": "新建文件夹",
    "version": "1.0.0",
    "name": "NewFolder",
    "group": "Folder",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>文件夹名字</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "preId",
            "description": "<p>父文件的id，如果在根目录下则不用传</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"folderName\": \"test\",\n   \"preId\": \"1234567891012\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>文件夹名字</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "preId",
            "description": "<p>父文件的id，如果在根目录下则没有返回</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"folderName\": \"test\",\n   \"folderId\": \"1234567891012\",\n   \"preId\": \"1234567891012\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/folder.js",
    "groupTitle": "Folder",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/folder/new-folder"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/folder/folder",
    "title": "删除文件夹",
    "version": "1.0.0",
    "name": "deleteFolder",
    "group": "Folder",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"folderId\": \"1234567891012\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/folder.js",
    "groupTitle": "Folder",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/folder/folder"
      }
    ]
  },
  {
    "type": "put",
    "url": "/folder/rename",
    "title": "重命名文件夹",
    "version": "1.0.0",
    "name": "renameFolder",
    "group": "Folder",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>文件夹名字</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"folderName\": \"test\",\n   \"preId\": \"1234567891012\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>文件夹名字</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"folderName\": \"test\",\n   \"folderId\": \"1234567891012\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/folder.js",
    "groupTitle": "Folder",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/folder/rename"
      }
    ]
  },
  {
    "type": "post",
    "url": "/trash/clear",
    "title": "清空回收站",
    "version": "1.0.0",
    "name": "ClearTrash",
    "group": "Trash",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/trash.js",
    "groupTitle": "Trash",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/trash/clear"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/trash/file",
    "title": "删除文件",
    "version": "1.0.0",
    "name": "DeleteFile",
    "group": "Trash",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileId",
            "description": "<p>文件的id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"fileId\": \"f_s8jzh3mgujgu\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/trash.js",
    "groupTitle": "Trash",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/trash/file"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/trash/folder",
    "title": "删除文件夹",
    "version": "1.0.0",
    "name": "DeleteFolder",
    "group": "Trash",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹的id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"folderId\": \"d_ogafytab13k5\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/trash.js",
    "groupTitle": "Trash",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/trash/folder"
      }
    ]
  },
  {
    "type": "post",
    "url": "/trash/restore-file",
    "title": "还原文件",
    "version": "1.0.0",
    "name": "RestoreFile",
    "group": "Trash",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹的id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileId",
            "description": "<p>文件的id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"fileId\": \"f_s8jzh3mgujgu\",\n   \"folderId\": \"d_ogafytab13k5\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/trash.js",
    "groupTitle": "Trash",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/trash/restore-file"
      }
    ]
  },
  {
    "type": "post",
    "url": "/trash/restore-folder",
    "title": "还原文件夹",
    "version": "1.0.0",
    "name": "RestoreFolder",
    "group": "Trash",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "folderId",
            "description": "<p>文件夹的id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"folderId\": \"d_ogafytab13k5\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/trash.js",
    "groupTitle": "Trash",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/trash/restore-folder"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/comment-like-list",
    "title": "获取评论点赞列表",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "name": "GetCommentLikeList",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"goodsId\": \"123456\"\n  \"likeNum\": 10\n  \"likeState\": true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "goodsId",
            "description": "<p>商品id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "likeNum",
            "description": "<p>点赞的数量</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "likeState",
            "description": "<p>点赞状态，true:点赞，false:取消点赞</p>"
          }
        ]
      }
    },
    "filename": "apidoc/api/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/user/comment-like-list"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/goods-like-list",
    "title": "获取商品点赞列表",
    "version": "1.0.0",
    "name": "GetGoodsLikeList",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>用户id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "HTTP/1.1 200 OK\n{\n   \"userId\": \"123456789\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "goodsLikeList",
            "description": "<p>点赞数组</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"goodsLikeList\": [\"100001\"]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/user/goods-like-list"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/goods-like",
    "title": "给商品点赞",
    "version": "1.0.1",
    "name": "GoodsLike",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "goodsId",
            "description": "<p>商品id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>用户id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"goodsId\": \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"goodsId\": \"123456\"\n  \"likeNum\": 10\n  \"likeState\": true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "goodsId",
            "description": "<p>商品id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "likeNum",
            "description": "<p>点赞的数量</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "likeState",
            "description": "<p>点赞状态，true:点赞，false:取消点赞</p>"
          }
        ]
      }
    },
    "filename": "apidoc/api/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/user/goods-like"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "登录",
    "version": "1.0.3",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱，开始必须是一个或者多个单词字符或者是-，加上@，然后又是一个或者多个单词字符或者是-。然后是点“.”和单词字符和-的组合，可以有一个或者多个组合。</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码，只能输入6-20个字母、数字、下划线</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"email\": \"123456@qq.com\",\n   \"password\": \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"userId\": \"123456789\",\n   \"password\": \"123456\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>字符串</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "userInfo",
            "description": "<p>用户的基本信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.nickName",
            "description": "<p>用户的基本信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.gender",
            "description": "<p>用户的基本信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.avatarUrl",
            "description": "<p>用户的基本信息</p>"
          }
        ]
      }
    },
    "filename": "apidoc/api/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/user/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/register",
    "title": "注册",
    "version": "1.0.0",
    "name": "Register",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱，开始必须是一个或者多个单词字符或者是-，加上@，然后又是一个或者多个单词字符或者是-。然后是点“.”和单词字符和-的组合，可以有一个或者多个组合。</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码，只能输入6-20个字母、数字、下划线</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "verifyCode",
            "description": "<p>验证码，六位数字组成</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"userId\": \"123456789\",\n   \"password\": \"123456\",\n   \"verifyCode\": \"123456\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>字符串</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "userInfo",
            "description": "<p>用户的基本信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.nickName",
            "description": "<p>用户的基本信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.gender",
            "description": "<p>用户的基本信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.avatarUrl",
            "description": "<p>用户的基本信息</p>"
          }
        ]
      }
    },
    "filename": "apidoc/api/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/user/register"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/reset-password",
    "title": "修改密码",
    "version": "1.0.2",
    "name": "ResetPassword",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "verifyCode",
            "description": "<p>验证码，六位数字组成</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱，开始必须是一个或者多个单词字符或者是-，加上@，然后又是一个或者多个单词字符或者是-。然后是点“.”和单词字符和-的组合，可以有一个或者多个组合。</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码，只能输入6-20个字母、数字、下划线</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"verifyCode\": \"123456\",\n   \"email\": \"123@qq.com\",\n   \"password\": \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>字符串</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "userInfo",
            "description": "<p>用户的基本信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.nickName",
            "description": "<p>用户的基本信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.gender",
            "description": "<p>用户的基本信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userInfo.avatarUrl",
            "description": "<p>用户的基本信息</p>"
          }
        ]
      }
    },
    "filename": "apidoc/api/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/user/reset-password"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/update-user-info",
    "title": "更新用户信息",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.2",
    "name": "UpdateUserInfo",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nickName",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gender",
            "description": "<p>用户性别，0：男，1：女</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avatarUrl",
            "description": "<p>用户头像</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"nickName\": \"cxm\",\n    \"gender\": 0,\n    \"avatarUrl\": \"http://cxm.png\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"email\": \"123@qq.com\"\n    \"nickName\": \"cxm\",\n    \"gender\": 0,\n    \"avatarUrl\": \"http://cxm.png\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nickName",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "gender",
            "description": "<p>用户性别，0：男，1：女</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avatarUrl",
            "description": "<p>用户头像</p>"
          }
        ]
      }
    },
    "filename": "apidoc/api/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://mall.cxmmao.com/api-free-game/user/update-user-info"
      }
    ]
  }
] });
