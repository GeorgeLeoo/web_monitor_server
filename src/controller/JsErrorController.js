import Response from '../lib/Response/Response'
import JsErrorService from '../service/JsErrorService'

class JsErrorController {
    // TODO: 查询JsError
    async get(ctx) {
        const options = {
            where: {}
        }
        const result = await JsErrorService.find(options)
        new Response(ctx).send(result)
    }

    // TODO: 创建JsError
    async create(ctx) {
        if (ctx.request.query) {
            const {m, u, l, c} = ctx.request.query
            const options = {
                errorMessage: m,
                lineNumber: l,
                columnNumber: c,
                origin_url: u,
            }
            const result = await JsErrorService.create(options)
            new Response(ctx).send(result)
        } else {
            new Response(ctx).send412('error')
        }
    }
}

export default new JsErrorController()
