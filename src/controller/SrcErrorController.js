import Response from '../lib/Response/Response'
import SrcErrorService from '../service/SrcErrorService'
import utils from '../utils'
import {HttpRequest} from '../lib/HttpRequest/HttpRequest';
import sequelize from './../config/db'
// const Op = sequelize.Op
import {Op} from 'sequelize'


class JsErrorController {
    // TODO: 查询SrcError
    async get(ctx) {
        const {page, limit, sourceUrl, startDate, endDate} = ctx.request.query
        const options = {page: Number(page), limit: Number(limit), where: {}}
        const groupOptions = {
            where: {},
            attributes: ['sourceUrl', [sequelize.fn('COUNT', sequelize.col('sourceUrl')), 'count']],
            group: 'sourceUrl',
            raw: true
        }
        if (sourceUrl) {
            options.where.sourceUrl = {[Op.like]: '%' + sourceUrl + '%'}
            groupOptions.where.sourceUrl = {[Op.like]: '%' + sourceUrl + '%'}
        }
        if (startDate && endDate) {
            options.where.createdAt = { $between: { startDate, endDate } }
            groupOptions.where.createdAt = { $between: { startDate, endDate } }
        }
        console.log(options.where)
        const groupByResult = await SrcErrorService.groupBy(groupOptions)
        const groupByMap = {}
        if (groupByResult.code === Response.SUCCESS) {
            groupByResult.data.map(v => {
                groupByMap[v.sourceUrl] = v
            })
        }
        const result = await SrcErrorService.findAndCountAll(options)
        if (Object.keys(groupByMap).length > 0) {
            result.data.list.map(v => {
                if (groupByMap[v.sourceUrl]) {
                    v.dataValues.count = Number(groupByMap[v.sourceUrl].count)
                }
                return v
            })
        }
        new Response(ctx).send200('', result.data)
    }

    // TODO: 创建SrcError
    async create(ctx) {
        if (ctx.request.query) {
            const {t, s, u} = ctx.request.query
            const ip = utils.getUserIp(ctx.request)
            const options = {
                sourceUrl: s,
                elementType: t,
                completeUrl: u,
                browserInfo: ctx.header['user-agent'],
                browserName: utils.getBrowser(ctx.header['user-agent']).split(':')[0],
                browserVersion: utils.getBrowser(ctx.header['user-agent']).split(':')[1],
                os: utils.getOs(ctx.header['user-agent']).version,
                deviceName: utils.getOs(ctx.header['user-agent']).name,
                monitorIp: ip
            }
            console.log(options)
            // if (ip) {
            //     console.log(ip)
            //     const url = 'https://restapi.amap.com/v3/ip?ip=' + ip + '&key=3ff7040137bad5ed6ce3e4044a1882d1&output=json'
            //     const r = await new HttpRequest().open(url)
            // }
            // console.log(options)
            const result = await SrcErrorService.create(options)
            new Response(ctx).send(result)
        } else {
            new Response(ctx).send412('error')
        }
    }
}

export default new JsErrorController()
