import BaseService from './baseService'
import JsErrorTable from '../table/jsError'

class JsErrorService extends BaseService{
    constructor () {
        super(JsErrorTable);
    }
}

export default new JsErrorService()
