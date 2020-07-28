import Router from 'koa-router'

import controller from '../../controller/UserController'

const router = new Router()

router.prefix('/user')

router.get('/', controller.get)

router.post('/', controller.create)

router.post('/register', controller.register)

router.post('/login', controller.login)

export default router
