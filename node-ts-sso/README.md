Node Typescript 项目，用于sso中间层
==================================

已知问题
----------
1. 使用Axios调用其他Java接口（一下成为JavaAPI）时，经常timeout；但是单独压测接JavaAPI时，不会存在10s的过期
具体code请看Issues #1

2. Axios调用JavaAPI时，会有一个。。。

技术点
----------
1. nodemon 自动监听文件变化，开发阶段方便 (没有使用)
2. ts-node-dev 自动监听文件变化，开发阶段方便 （项目中使用）
3. gulp 拷贝文件夹
4. cross-env 部署动态带入process.env.NODE_ENV
5. tsc
6. koa2，koa2-cors，koa-bodyparser，koa-router
7. axios
8. jsonwebtoken 中间件

优化点
----------
1. axios 统一设置timeout，以免长时间占用

to do
----------
1. 尾递归优化