class DemoController {

    async demo(ctx) {
        ctx.body = {
            msg: 'body msg'
        }
    }

    async demo1(ctx) {
        ctx.body = {
            msg: 'body msg1'
        }
    }
}

export default new DemoController()