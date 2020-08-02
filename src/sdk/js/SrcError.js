class SrcError {
    start() {
        this._recordSrcError()
    }

    /**
     * 监控页面静态资源加载报错
     */
    _recordSrcError() {
        window.addEventListener('error', ev => {
            console.log(ev)
            const typeName = ev.target.localName;
            let sourceUrl = '';
            if (typeName === 'link') {
                sourceUrl = ev.target.href;
            } else if (typeName === 'script') {
                sourceUrl = ev.target.src;
            }
            this._send(typeName, sourceUrl)
        }, true)
    }

    _send(typeName, sourceUrl) {
        const url = 'http://localhost:54321/srcError'
        const params = {
            t: typeName,
            s: sourceUrl,
            u: window.location.href
        }
        this._http(url, params)
    }

    _http(url, params) {
        let _url = url
        const paramsArray = Object.keys(params)
        if (paramsArray.length > 0) {
            _url += '?'
        }
        paramsArray.map(v => {
            _url += `${v}=${params[v]}&`
        })
        _url = _url.substring(0, _url.length - 1)
        new Image().src = _url
    }
}

new SrcError().start()

