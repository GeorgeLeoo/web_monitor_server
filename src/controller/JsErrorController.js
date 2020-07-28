import Response from './../utils/Response'
import JsErrorService from '../service/JsErrorService'

class JsErrorController {
    // TODO: 查询JsError
    async get (ctx) {
        const options = {
            where: {}
        }
        const result = await JsErrorService.find(options)
        new Response(ctx).send(result)
    }
    
    // TODO: 创建JsError
    async create (ctx) {
        const options = {}
        const result = await JsErrorService.create(options)
        new Response(ctx).send(result)
    }
}

export default new JsErrorController()
