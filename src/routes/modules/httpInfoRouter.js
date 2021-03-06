import Router from 'koa-router'

import controller from '../../controller/HttpInfoController'

const router = new Router()

router.prefix('/httpInfo')

router.get('/', controller.create)

router.get('/get', controller.get)

router.get('/chart', controller.getChart)

router.get('/count', controller.getCount)

// router.post('/', controller.create)
//
// router.put('/', controller.update)
//
// router.delete('/', controller.delete)

export default router
