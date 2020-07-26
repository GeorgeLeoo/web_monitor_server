import combineRoutes from 'koa-combine-routers'

import demoRoutes from './demoRouter'

module.exports = combineRoutes(demoRoutes)