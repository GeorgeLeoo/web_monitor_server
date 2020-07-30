import jwt from 'jsonwebtoken'
import secret from '../../config/secret.json'
import Response from '../Response/Response'

export class Token {
    accessToken (content) {
        // let expiresIn = Math.round((new Date().getTime() / 1000)) + 3600; // 过期时间
        let expiresIn = 60 * 60 * 24 // 过期时间
        // let expiresIn = 1; // 立刻过期
        let token = jwt.sign(content, secret.sign, { expiresIn })
        return {
            token,
            expiresIn
        }
    }
    checkToken (token) {
        return new Promise((resolve) => {
            const login_error = '登录已失效，请重新登录'
            jwt.verify(token, secret.sign, err => {
                if (!!err) {
                    //时间失效或伪造 token 或 token 不存在
                    resolve({ code: Response.UN_AUTHENTICATION, msg: login_error })
                } else {
                    resolve({ code: Response.SUCCESS, msg: '' })
                }
            })
        })
    }
}

export default new Token()
