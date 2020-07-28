import path from 'path'
import Koa from 'koa'
import compose from 'koa-compose'
import koaBody from 'koa-body'
import json from 'koa-json'
import cors from '@koa/cors'

let WebSocket = require('koa-websocket')

// 安全插件
import helmet from 'koa-helmet'
// 静态资源插件
import statics from 'koa-static'
import compress from 'koa-compress'

import verifyHandler from './utils/verifyHandler'

import errorHandle from './utils/errorHandle'

import router from './routes'

import log from './utils/log'

const app = WebSocket(new Koa())

const isDevMode = (process.env.NODE_ENV !== 'production')

// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', '*')
//     ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//     ctx.set('Access-Control-Allow-Headers', 'access-token')
//     ctx.set('Access-Control-Allow-Credentials', true)
//     ctx.set('X-Powered-By', '3.2.1')
//     ctx.set('Content-Type', 'application/json;charset=utf-8')
//     if (ctx.method === 'OPTIONS') {
//         ctx.body = 200
//     } else {
//         await next()
//     }
// })

// 登录校验
app.use(verifyHandler())

// koa-compose 集成中间件
const middleware = compose([
    koaBody({
        multipart: true,
        formidable: {
            keepExtensions: true,
            maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
        }
    }),
    statics(path.join(__dirname, '../public')),
    cors(),
    json({ pretty: false, param: 'pretty' }),
    helmet(),
    errorHandle,
    router()
])

app.use(async (ctx, next) => {
    const start = new Date()
    let ms = 0
    try {
        await next()
        ms = new Date() - start
        console.log('[http] ' + ctx.url + ' [Date]' + new Date() + ' [time]' + ms)
    } catch (error) {
        //记录异常日志
        log.error(ctx, error, ms)
        ctx.response.status = 500
        // ctx.body = statusCode.ERROR_500('服务器异常，请检查 logs/error 目录下日志文件', "")
    }
})

if (isDevMode) {
    app.use(compress())
}

app.use(middleware)

export default app
