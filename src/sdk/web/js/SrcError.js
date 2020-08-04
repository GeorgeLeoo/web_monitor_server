import Base from './Base';

class SrcError extends Base{
    constructor(props) {
        super(props);
    }

    start() {
        this._recordSrcError()
    }

    /**
     * 监控页面静态资源加载报错
     */
    _recordSrcError() {
        window.addEventListener('error', ev => {
            // console.log(ev)
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
}

// new SrcError().start()

export default SrcError
