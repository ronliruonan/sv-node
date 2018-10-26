/**
 * Node内置模块fs 文件读写
 */
const fs = require("fs")

// 1. readFile('path',function(err, data){})
// 2. writeFile('path',data,function(err){})
// 3. stat(path, function(err,stat){
// stat.isFile(), stat.isDirectory(), stat.size, stat.birthtime, stat.mtime
// })