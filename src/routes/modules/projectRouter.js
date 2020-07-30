import Router from 'koa-router'

import controller from '../../controller/ProjectController'

const router = new Router()

router.prefix('/project')

router.get('/', controller.get)

router.get('/projectId', controller.getByProjectId)

router.post('/', controller.create)
//
// router.put('/', controller.update)
//
router.delete('/', controller.delete)

export default router
