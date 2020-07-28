import Response from './../utils/Response'
import history from './../schema/test'

class JsErrorController {
    // TODO: 查询JsError
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
    
    // TODO: 创建JsError
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
}

export default new JsErrorController()
