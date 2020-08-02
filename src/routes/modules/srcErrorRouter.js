import Router from 'koa-router'

import controller from '../../controller/SrcErrorController'

const router = new Router()

router.prefix('/srcError')

router.get('/', controller.create)

router.get('/get', controller.get)

// router.post('/', controller.create)
//
// router.put('/', controller.update)
//
// router.delete('/', controller.delete)

export default router
