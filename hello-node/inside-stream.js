/**
 * Node 内置模块Stream
 */
'use strict'

const fs = require('fs')

var rs = fs.createReadStream('path', 'utf-8')

rs.on('data', function (chunk) {
    console.log(chunk)
})
rs.on('end', function () {
    // end
})
rs.on('error', function (err) {
    // err
})

var sw = fs.createWriteStream('path.txt', 'utf-8')
sw.write('')
sw.write('')
sw.end()

// 管道
rs.pipe(sw)