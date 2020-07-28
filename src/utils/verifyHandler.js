import jwt from 'jsonwebtoken'
import secret from '../config/secret'
import util from 'util'
import Response from '../utils/Response'

const verify = jwt.verify

/**
 * 判断token是否可用
 */
module.exports = function () {
    return async function (ctx, next) {
        const login_error = '登录已失效，请重新登录'
        const token = ctx.header['access-token']  // 获取jwt
        if (token === undefined) {
            await next();
        } else {
            await verify(token, secret.sign, async (err, decode) => {
                if (err) {
                    err.status = 401;
                    new Response(ctx).send401(login_error)
                    return
                }
                const { emailName, password, userId, userType } = decode
                // 解密payload，获取用户名和ID
                ctx.user = {
                    emailName, password, userId, userType
                }
                await next();
            })
        }
    }
}
