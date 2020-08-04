import Response from '../lib/Response/Response'
import {DBHandler} from '../utils'
import {DB} from '../lib/DB/DB';

class BaseService {
    constructor(table) {
        this.table = table
    }

    find(options = {}) {
        return DBHandler(async resolve => {
            const conditions = {
                where: options,
                order: [['id', 'desc']]
            }
            const data = await this.table.findAll(conditions)
            resolve({code: Response.SUCCESS, data})
        })
    }

    findAndCountAll({where, page, limit, group}) {
        return DBHandler(async resolve => {
            const conditions = {
                where,
                order: [['id', 'desc']]
            }
            if (page) {
                conditions.offset = (page - 1) * limit
            }
            if (limit) {
                conditions.limit = limit
            }
            if (group) {
                conditions.group = group
            }
            const data = await this.table.findAndCountAll(conditions)
            resolve({code: Response.SUCCESS, data: {list: data.rows, total: data.count}})
        })
    }

    create(options) {
        return DBHandler(async resolve => {
            const data = await this.table.create(options)
            resolve({code: Response.SUCCESS, data})
        })
    }

    delete(options) {
        return DBHandler(async resolve => {
            const conditions = {
                where: options
            }
            const data = await this.table.destroy(conditions)
            resolve({code: Response.SUCCESS, data})
        })
    }

    groupBy(options = {}) {
        return DBHandler(async resolve => {
            const data = await this.table.findAll(options)
            resolve({code: Response.SUCCESS, data})
        })
    }

    count(options) {
        return DBHandler(async resolve => {
            const total = await this.table.count(options)
            resolve({code: Response.SUCCESS, data: { total } })
        })
    }
}

export default BaseService
