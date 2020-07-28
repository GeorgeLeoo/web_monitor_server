import BaseService from './baseService'
import UserTable from '../table/user'

class UserService extends BaseService{
    constructor () {
        super(UserTable);
    }
}

export default new UserService()
