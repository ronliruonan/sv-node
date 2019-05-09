/** fs system */

const fs = require('fs');

const module_options = {
    encoding: 'utf8'
};

// 文件路径 可以指定为字符串、Buffer、file:协议的URL对象

async function writeFile(path, data, options = null) {
    options = options || module_options;

    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, options, (err) => {
            err ? reject(err) : resolve();
        })
    });
}
async function readFile(path, options = null) {
    options = options || module_options;

    return new Promise(function (resolve, reject) {
        fs.readFile(path, options, (err, data) => {
            if (err) return reject(err);

            resolve(data);
        });
    })
}

module.exports.writeFile = writeFile;
module.exports.readFile = readFile;
