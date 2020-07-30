import Response from '../lib/Response/Response'
import history from '../table/test'
import UserService from '../service/UserService'
import token from '../lib/Token/Token'

class UserController {
    // TODO: 查询用户
    async get (ctx) {
        const options = {
            where: {}
        }
        const id = ctx.query.id
        if (id) {
            options.where.id = id
        }
        try {
            const historys = await history.findAll(options)
            new Response(ctx).send200('ok', historys)
        } catch (e) {
            console.log(e)
        }
    }

    // TODO: 创建用户
    async create (ctx) {
        try {
            history.sync().then(() => {})
            const result = await history.create({
                username: 'xx',
                password: '123456',
            })
            new Response(ctx).send200('ok', result)
        } catch (e) {
            console.log(e)
        }
    }

    // TODO: 注册
    async register (ctx) {
        const { username, password } = ctx.request.body
        if (!username) {
            new Response(ctx).send412('用户名不能为空')
            return
        }
        if (!password) {
            new Response(ctx).send412('密码不能为空')
            return
        }
        const res = await UserService.find({username})
        let msg = ''
        if (res.data[0] && res.data[0].username === username) {
            msg = '用户名已存在'
            new Response(ctx).send200(msg)
        } else {
            const { data } = await UserService.create({ username, password })
            new Response(ctx).send200(msg, data)
        }

    }

    // TODO: 登陆
    async login (ctx) {
        const { username, password } = ctx.request.body
        const { code, data } = await UserService.find({ username, password })
        let msg = ''
        let user
        if (data.length === 0) {
            msg = '账号或密码错误'
        } else {
            let result = token.accessToken({ username })
            user = Object.assign({ uid: data[0].id }, { token: result.token })
        }
        new Response(ctx).send({ code, msg, data: user })
    }
}

export default new UserController()
