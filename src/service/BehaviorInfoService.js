import BaseService from './baseService'
import BehaviorInfoTable from '../table/behaviorInfo'

class BehaviorInfoService extends BaseService{
    constructor () {
        super(BehaviorInfoTable);
    }
}

export default new BehaviorInfoService()
