import Router from 'koa-router'

import controller from '../../controller/jsErrorController'

const router = new Router()

router.prefix('/jsError')

router.get('/', controller.get)

router.post('/', controller.create)
//
// router.put('/', controller.update)
//
// router.delete('/', controller.delete)

export default router
