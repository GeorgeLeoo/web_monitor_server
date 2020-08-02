import fs from 'fs'
import Response from '../lib/Response/Response'
// import sdk from './../sdk/js/index'
import ProjectService from '../service/ProjectService'

// const path = '/Users/georgeleeo/Documents/project/web_monitor_server/src/sdk/js/JsError.js'
const path = '/Users/georgeleeo/Documents/project/web_monitor_server/src/sdk/js/SrcError.js'
// const path = '/Users/georgeleeo/Documents/project/web_monitor_server/src/sdk/js/HttpInfo.js'
// const path = '/Users/georgeleeo/Documents/project/web_monitor_server/src/sdk/js/BehaviorInfo.js'

class SdkController {
    async get (ctx){
        if (ctx.request.url.split('/sdk/') && ctx.request.url.split('/sdk/')[1]) {
            let key = ctx.request.url.split('/sdk/')[1]
            const {code, data} = await ProjectService.getProjectKey(key)
            if (code === Response.SUCCESS && data[0]['projectKey']) {
                let a = fs.readFileSync(path)
                ctx.set('Content-Type', 'application/x-javascript')
                new Response(ctx).sendBase(a)
            } else {
                new Response(ctx).sendBase('error')
            }
        } else {
            new Response(ctx).sendBase('error')
        }
    }
}

export default new SdkController()
