import fetch from 'node-fetch'
import Response from '../Response/Response'

export class HttpRequest {
    constructor() {
    }
    open(url, params) {
        return new Promise(resolve => {
            fetch(url)
                .then(res => res.json())
                .then(json => resolve({code: Response.SUCCESS, msg: '', data: json}))
                .catch(err => resolve({code: Response.SERVER_ERROR, msg: err, data: []}))
        })
    }
}

export default new HttpRequest()
