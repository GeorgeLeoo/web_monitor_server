import combineRoutes from 'koa-combine-routers'

import userRouter from './modules/userRouter'
import jsErrorRouter from './modules/jsErrorRouter'
import srcErrorRouter from './modules/srcErrorRouter'
import httpInfoRouter from './modules/httpInfoRouter'
import behaviorInfoRouter from './modules/behaviorInfoRouter'
import sdkRouter from './modules/sdkRouter'
import projectRouter from './modules/projectRouter'

module.exports = combineRoutes(userRouter, jsErrorRouter, sdkRouter, projectRouter, srcErrorRouter, httpInfoRouter, behaviorInfoRouter)
