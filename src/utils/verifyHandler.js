import Response from '../utils/Response'
import token from './Token'

/**
 * 判断token是否可用
 */
module.exports = function () {
    return async function (ctx, next) {
        const access_token = ctx.header['access-token']  // 获取jwt
        if (access_token === undefined) {
            await next()
        } else {
            await token.checkToken(access_token, async ({ code, msg }) => {
                if (code === Response.SUCCESS && msg) {
                    new Response(ctx).send401(msg)
                    return
                }
                await next()
            })
        }
    }
}
