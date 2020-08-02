import BaseService from './baseService'
import HttpInfoTable from '../table/httpInfo'

class HttpInfoService extends BaseService{
    constructor () {
        super(HttpInfoTable);
    }
}

export default new HttpInfoService()
