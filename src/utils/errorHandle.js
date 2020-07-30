import Response from '../lib/Response/Response'

export default (ctx, next) => {
    return next().catch((err) => {
        if (err.status === Response.UN_AUTHENTICATION) {
            ctx.status = Response.UN_AUTHENTICATION
            ctx.body = {
                code: Response.UN_AUTHENTICATION,
                msg: err.message
            }
        } else {
            ctx.status = err.status || Response.SERVER_ERROR
            ctx.body = {
                code: Response.SERVER_ERROR,
                msg: err.message
            }
        }
    })
}
