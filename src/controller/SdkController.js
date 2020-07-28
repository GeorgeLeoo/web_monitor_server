import Response from './../utils/Response'
// import sdk from './../sdk/js/index'
import fs from 'fs'

class SdkController {
    async get (ctx) {
        let a = fs.readFileSync('/Users/georgeleeo/Documents/project/web_monitor_server/src/sdk/js/index.js')
        ctx.set('Content-Type', 'application/x-javascript')
        new Response(ctx).sendBase(a)
    }
}

export default new SdkController()
