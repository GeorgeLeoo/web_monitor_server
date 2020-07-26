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

const errorHandler = require('./utils/errorHandler')

import router from './routes'

const app = WebSocket(new Koa())

const isDevMode = (process.env.NODE_ENV !== 'production')

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    ctx.set('Access-Control-Allow-Headers', 'access-token')
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('X-Powered-By', '3.2.1')
    ctx.set('Content-Type', 'application/json;charset=utf-8')
    if (ctx.method === 'OPTIONS') {
        ctx.body = 200
    } else {
        await next()
    }
})

// 登录校验
app.use(errorHandler())

// koa-compose 集成中间件
const middleware = compose([
    koaBody(),
    statics(path.join(__dirname, '../public')),
    cors(),
    json({ pretty: false, param: 'pretty' }),
    helmet(),
    router()
])

app.use(async (ctx, next) => {
    const start = new Date()
    let ms = 0
    try {
        await next()
        ms = new Date() - start
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

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

const PORT = 54321

app.listen(PORT, () => {
    console.log('----------------------------------------------')
    console.log('--     Server is running on port ' + PORT + '      --')
    console.log('----------------------------------------------')
})
