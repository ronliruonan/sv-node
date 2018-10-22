'use strict'

// import "hello" module
// 引入的模块作为变量保存在greet变量中，greet就是hello.js 中用module.exports = greet输出的greet函数
const greet = require('./hello');

let s = 'Michael'

greet(s); 