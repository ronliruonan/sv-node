"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const app = new koa_1.default();
const router = require('koa-router')();
const bodyParse = require('koa-bodyparser');
const cors = require('koa2-cors');
app.use(cors());
app.use(bodyParse());
app.use(router.routes());
app.listen(6204, () => {
    console.log('ing', 6204);
});
router.get('/', async (ctx) => {
    console.log(ctx.request);
    ctx.body = ctx.querystring;
});
//# sourceMappingURL=main.js.map