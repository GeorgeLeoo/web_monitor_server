import Response from '../lib/Response/Response'
import { DBHandler } from '../utils'

class BaseService {
    constructor (table) {
        this.table = table
    }

    find (options = {}) {
        return DBHandler(async resolve => {
            const conditions = {
                where: options
            }
            const data = await this.table.findAll(conditions)
            resolve({ code: Response.SUCCESS, data })
        })
    }

    create (options) {
        return DBHandler(async resolve => {
            const data = await this.table.create(options)
            resolve({ code: Response.SUCCESS, data })
        })
    }

    delete (options) {
        return DBHandler(async resolve => {
            const conditions = {
                where: options
            }
            const data = await this.table.destroy(conditions)
            resolve({ code: Response.SUCCESS, data })
        })
    }
}

export default BaseService
