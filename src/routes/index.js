import combineRoutes from 'koa-combine-routers'

import jsErrorRouter from './modules/jsErrorRouter'

module.exports = combineRoutes(jsErrorRouter)
