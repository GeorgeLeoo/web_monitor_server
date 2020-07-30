import BaseService from './baseService'
import ProjectTable from '../table/project'

class ProjectService extends BaseService {
    constructor() {
        super(ProjectTable);
    }

    getProjectKey(key) {
        const options = {
            project_key: key
        }
        return this.find(options)
    }
}

export default new ProjectService()
