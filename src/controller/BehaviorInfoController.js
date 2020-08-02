import Response from '../lib/Response/Response'
import BehaviorInfoService from '../service/BehaviorInfoService'
import utils from '../utils'
import {HttpRequest} from '../lib/HttpRequest/HttpRequest';

class JsErrorController {
    // TODO: 查询JsError
    async get(ctx) {
        const options = {
            where: {}
        }
        const result = await BehaviorInfoService.find(options)
        new Response(ctx).send(result)
    }

    // TODO: 创建JsError
    async create(ctx) {
        if (ctx.request.query) {
            const {e,c,p,i,t,n,u} = ctx.request.query
            const ip = utils.getUserIp(ctx.request)
            const options = {
                origin_url: u,
                behaviorType: e,
                className: c,
                inputValue: i,
                placeholder: p,
                tagName: t,
                innerText: n,
                browserInfo: ctx.header['user-agent'],
                browserName: utils.getBrowser(ctx.header['user-agent']).split(':')[0],
                browserVersion: utils.getBrowser(ctx.header['user-agent']).split(':')[1],
                os: utils.getOs(ctx.header['user-agent']).version,
                deviceName: utils.getOs(ctx.header['user-agent']).name,
                monitorIp: ip
            }
            // if (ip) {
            //     console.log(ip)
            //     const url = 'https://restapi.amap.com/v3/ip?ip=' + ip + '&key=3ff7040137bad5ed6ce3e4044a1882d1&output=json'
            //     const r = await new HttpRequest().open(url)
            // }
            // console.log(options)
            const result = await BehaviorInfoService.create(options)
            new Response(ctx).send(result)
        } else {
            new Response(ctx).send412('error')
        }
    }
}

export default new JsErrorController()
