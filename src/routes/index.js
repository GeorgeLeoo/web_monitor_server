import combineRoutes from 'koa-combine-routers'

import userRouter from './modules/userRouter'
import jsErrorRouter from './modules/jsErrorRouter'

module.exports = combineRoutes(userRouter, jsErrorRouter)
