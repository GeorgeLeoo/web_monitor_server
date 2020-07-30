import combineRoutes from 'koa-combine-routers'

import userRouter from './modules/userRouter'
import jsErrorRouter from './modules/jsErrorRouter'
import sdkRouter from './modules/sdkRouter'
import projectRouter from './modules/projectRouter'

module.exports = combineRoutes(userRouter, jsErrorRouter, sdkRouter, projectRouter)
