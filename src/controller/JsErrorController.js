import Response from '../lib/Response/Response'
import JsErrorService from '../service/JsErrorService'
import utils from '../utils'
import {HttpRequest} from '../lib/HttpRequest/HttpRequest';
import sequelize from '../config/db';
import {Op} from 'sequelize';

class JsErrorController {
    // TODO: 查询JsError
    async get(ctx) {
        const {page, limit, errorMessage, uploadType, startDate, endDate} = ctx.request.query
        const options = {page: Number(page), limit: Number(limit), where: {}}
        const groupOptions = {
            where: {},
            attributes: ['errorMessage', [sequelize.fn('COUNT', sequelize.col('errorMessage')), 'count']],
            group: 'errorMessage',
            raw: true
        }
        if (uploadType) {
            options.where.uploadType = uploadType
            groupOptions.where.uploadType = uploadType
        }
        if (errorMessage) {
            options.where.errorMessage = {[Op.like]: '%' + errorMessage + '%'}
            groupOptions.where.errorMessage = {[Op.like]: '%' + errorMessage + '%'}
        }
        if (startDate && endDate) {
            options.where.createdAt = { $between: { startDate, endDate } }
            groupOptions.where.createdAt = { $between: { startDate, endDate } }
        }
        console.log(options.where)
        const groupByResult = await JsErrorService.groupBy(groupOptions)
        const groupByMap = {}
        if (groupByResult.code === Response.SUCCESS) {
            groupByResult.data.map(v => {
                groupByMap[v.errorMessage] = v
            })
        }
        const result = await JsErrorService.findAndCountAll(options)
        if (Object.keys(groupByMap).length > 0) {
            result.data.list.map(v => {
                if (groupByMap[v.errorMessage]) {
                    v.dataValues.count = Number(groupByMap[v.errorMessage].count)
                }
                return v
            })
        }
        new Response(ctx).send200('', result.data)
    }

    // TODO: 创建JsError
    async create(ctx) {
        // console.log(utils.getUserIp(ctx.request))
        // console.log(ctx.request.ip)
        if (ctx.request.query) {
            const {m, u, l, c, p, k, t} = ctx.request.query
            let type = Number(t)
            if (type === 0) {
                type = 'console.error'
            }
            if (type === 1) {
                type = 'window.error'
            }
            const ip = utils.getUserIp(ctx.request)
            const options = {
                errorMessage: m,
                lineNumber: l,
                columnNumber: c,
                origin_url: u,
                completeUrl: p,
                browserInfo: ctx.header['user-agent'],
                browserName: utils.getBrowser(ctx.header['user-agent']).split(':')[0],
                browserVersion: utils.getBrowser(ctx.header['user-agent']).split(':')[1],
                os: utils.getOs(ctx.header['user-agent']).version,
                deviceName: utils.getOs(ctx.header['user-agent']).name,
                monitorIp: ip,
                pageKey: k,
                uploadType: type,
                simpleUrl: p.split('://')[1].split('/')[1]
            }
            // if (ip) {
            //     console.log(ip)
            //     const url = 'https://resterrorMessage.amap.com/v3/ip?ip=' + ip + '&key=3ff7040137bad5ed6ce3e4044a1882d1&output=json'
            //     const r = await new HttpRequest().open(url)
            // }
            const result = await JsErrorService.create(options)
            new Response(ctx).send(result)
        } else {
            new Response(ctx).send412('error')
        }
    }
}

export default new JsErrorController()
