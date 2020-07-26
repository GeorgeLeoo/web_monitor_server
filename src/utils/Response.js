class Response {
    constructor (ctx) {
        this.ctx = ctx
    }
  
    send ({ code = Response.SUCCESS, msg = '', data = [] }) {
        this.ctx.response.status = code
        this.ctx.body = { code, msg, data }
    }
  
    send200 (msg, data) {
        this.send({ msg, data })
    }
  
    send412 (msg) {
        this.send({ code: 421, msg })
    }
  
    send404 (msg) {
        this.send({ code: Response.NOT_FOUND, msg })
    }
  
    send403 (msg) {
        this.send({ code: 403, msg })
    }
  
    send401 (msg) {
        this.send({ code: Response.UN_AUTHENTICATION, msg })
    }
  
    send500 (msg) {
        this.send({ code: Response.SERVER_ERROR, msg })
    }
}

Response.SUCCESS =  200
Response.SERVER_ERROR =  500
Response.NOT_FOUND =  404
Response.UN_AUTHENTICATION =  404

module.exports = Response
