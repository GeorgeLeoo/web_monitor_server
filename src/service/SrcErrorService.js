import BaseService from './baseService'
import SrcErrorTable from '../table/srcError'

class SrcErrorService extends BaseService{
    constructor () {
        super(SrcErrorTable);
    }
}

export default new SrcErrorService()
