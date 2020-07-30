import fs from 'fs'
import Response from '../lib/Response/Response'
// import sdk from './../sdk/js/index'
import ProjectService from '../service/ProjectService'


class SdkController {
    async get (ctx){
        if (ctx.request.url.split('/sdk/') && ctx.request.url.split('/sdk/')[1]) {
            let key = ctx.request.url.split('/sdk/')[1]
            const {code, data} = await ProjectService.getProjectKey(key)
            if (code === Response.SUCCESS && data[0]['projectKey']) {
                let a = fs.readFileSync('/Users/georgeleeo/Documents/project/web_monitor_server/src/sdk/js/index.js')
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
