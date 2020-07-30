import Response from '../lib/Response/Response'
import token from '../lib/Token/Token'

/**
 * 判断token是否可用
 */
module.exports = function () {
    return async function (ctx, next) {
        const access_token = ctx.header['access-token']  // 获取jwt
        if (access_token === undefined) {
            await next()
        } else {
            const {code, msg} = await token.checkToken(access_token)
            if (code !== Response.SUCCESS && msg) {
                new Response(ctx).send401(msg)
                return
            }
            await next()
        }
    }
}
