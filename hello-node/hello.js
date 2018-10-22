// hello.js
// 在Node环境中，一个.js文件就称之为一个模块（module）
// hello.js文件就是一个模块，模块的名字就是文件名,
// 所以hello.js 文件就是名为hello的模块
'use strict'
const s = 'hello'
function greet(name) {
    console.log(s + ',' + name + '|')
}

module.exports = greet;

/**
 * 全局变量不是什么好事，同一个变量名，可能被赋予不同的场景
 * nodejs通过闭包进行包裹
 * (function(){
 *   ... 试题内容
 * })();
 */
/**
 * Node 利用js的函数式编程的特性，实现模块的隔离
 * moudle.exports怎么实现的呢？？？
 * // 实现准备module对象
 * var module = {id:'hell',exports:{}}
 * var load = function(module){
 *   读取hello.js代码
 *   function greet(name){
 *     console.log('Hello,'+name+'|')
 *   }
 *   module.exports = greet;
 *   return module.exports;
 * }
 * var exported  = load(module)
 * // 保存module
 * save(module, exported)
 */

 /**
  * Node环境中，两种模块输出变量
  * module.exports={a:a,b:b}
  * exports.a=a; exports.b = b;
  * 
  * exports = {a:a, b:b} // this's error
  */