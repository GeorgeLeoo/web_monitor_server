import Router from 'koa-router'

import controller from '../../controller/BehaviorInfoController'

const router = new Router()

router.prefix('/behaviorInfo')

router.get('/', controller.create)

// router.post('/', controller.create)
//
// router.put('/', controller.update)
//
// router.delete('/', controller.delete)

export default router
