import combineRoutes from 'koa-combine-routers'

import userRouter from './modules/userRouter'
import jsErrorRouter from './modules/jsErrorRouter'
import sdkRouter from './modules/sdkRouter'

module.exports = combineRoutes(userRouter, jsErrorRouter, sdkRouter)
