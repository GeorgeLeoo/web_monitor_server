import Response from './../utils/Response'
import UserTable from '../schema/user'
import {DBHandler} from '../utils'

class UserService {
    find (options) {
        return DBHandler(async resolve => {
            const options = {
                where: options
            }
            const data = await UserTable.findAll(options)
            resolve({ code: Response.SUCCESS, data })
        })
    }
    create(options) {
        return DBHandler(async resolve => {
            const data = await UserTable.create(options)
            resolve({ code: Response.SUCCESS, data })
        })
    }
}

export default new UserService()
