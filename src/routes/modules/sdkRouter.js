import Router from 'koa-router'
import controller from '../../controller/SdkController'

const router = new Router()

router.prefix('/sdk')

router.get('/:key', controller.get)

export default router
