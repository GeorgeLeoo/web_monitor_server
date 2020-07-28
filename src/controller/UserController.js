import Response from './../utils/Response'
import history from './../schema/test'
import UserTable from '../schema/user'
import UserService from '../service/UserService'

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
        
        const { data } = await UserService.create({ username, password })
    
        new Response(ctx).send200('', data)
    }
    
    // TODO: 登陆
    async login (ctx) {
        const { username, password } = ctx.request.body
        const { code, data } = await UserService.find({ username, password })
        let msg = ''
        if (data.length === 0) {
            msg = '账号或密码错误'
        }
        new Response(ctx).send({ code, msg, data })
    }
}

export default new UserController()
