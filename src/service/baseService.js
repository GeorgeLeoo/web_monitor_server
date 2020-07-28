import Response from './../utils/Response'
import { DBHandler } from '../utils'

class BaseService {
    constructor (table) {
        this.table = table
    }
    
    find (options = {}) {
        return DBHandler(async resolve => {
            const attributions = {
                where: options
            }
            const data = await this.table.findAll(attributions)
            resolve({ code: Response.SUCCESS, data })
        })
    }
    
    create (options) {
        return DBHandler(async resolve => {
            const data = await this.table.create(options)
            resolve({ code: Response.SUCCESS, data })
        })
    }
}

export default BaseService
