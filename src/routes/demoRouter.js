import Router from 'koa-router'

import demoController from '../api/demoController'

const router = new Router()

router.prefix('/demo')

router.get('/', demoController.demo)
router.get('/user', demoController.demo1)


export default router
