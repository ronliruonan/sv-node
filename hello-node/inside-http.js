// 文件服务器

'use strict'
var url = require('url')
var path = require('path')

var workDir = path.resolve('.') // 解析当前目录

// 组合完整的路径
var filePath = path.join(workDir, 'pub','index.html')

var http = require('http')
