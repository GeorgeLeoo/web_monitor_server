import Response from '../lib/Response/Response'
import HttpInfoService from '../service/HttpInfoService'
import utils from '../utils'
import {HttpRequest} from '../lib/HttpRequest/HttpRequest';
import sequelize from '../config/db';
import {Op} from 'sequelize';

class HttpInfoController {
    // TODO: 查询HttpInfo
    async get(ctx) {
        const {page, limit, httpUrl, startDate, endDate} = ctx.request.query
        const options = {page: Number(page), limit: Number(limit), where: {}}
        const groupOptions = {
            where: {},
            attributes: ['httpUrl', [sequelize.fn('COUNT', sequelize.col('httpUrl')), 'count']],
            group: 'httpUrl',
            raw: true
        }
        options.where.status = {[Op.notLike]: '2%'}
        groupOptions.where.status = {[Op.notLike]: '2%'}
        if (httpUrl) {
            options.where.httpUrl = {[Op.like]: '%' + httpUrl + '%'}
            groupOptions.where.httpUrl = {[Op.like]: '%' + httpUrl + '%'}
        }
        if (startDate && endDate) {
            options.where.createdAt = { $between: { startDate, endDate } }
            groupOptions.where.createdAt = { $between: { startDate, endDate } }
        }
        console.log(options.where)
        const groupByResult = await HttpInfoService.groupBy(groupOptions)
        const groupByMap = {}
        if (groupByResult.code === Response.SUCCESS) {
            groupByResult.data.map(v => {
                groupByMap[v.httpUrl] = v
            })
        }
        const result = await HttpInfoService.findAndCountAll(options)
        if (Object.keys(groupByMap).length > 0) {
            result.data.list.map(v => {
                if (groupByMap[v.httpUrl]) {
                    v.dataValues.count = Number(groupByMap[v.httpUrl].count)
                }
                return v
            })
        }
        new Response(ctx).send200('', result.data)
    }

    // TODO: 创建HttpInfo
    async create(ctx) {
        if (ctx.request.query) {
            const {s,u,a,e,t,r,p,m} = ctx.request.query
            const ip = utils.getUserIp(ctx.request)
            const options = {
                httpUrl: u,
                simpleHttpUrl: s,
                status: a,
                statusText: e,
                statusResult: r,
                loadTime: m,
                type: t,
                timeStamp: p,
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
            const result = await HttpInfoService.create(options)
            new Response(ctx).send(result)
        } else {
            new Response(ctx).send412('error')
        }
    }
}

export default new HttpInfoController()
