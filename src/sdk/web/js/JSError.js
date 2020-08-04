import Base from './Base';

/**
 * js 错误上报
 */
class JSError extends Base{
    constructor(props) {
        super(props);
    }

    start() {
        this._overwriteConsoleError()
        this._overwriteWindowError()
    }

    /**
     * 重写 console.error 事件， 可捕获自定义报错信息
     * @private
     */
    _overwriteConsoleError() {
        let systemConsoleError = console.error
        console.error = () => {
            // console.log(this)
            const errorMsg = arguments[0] && arguments[0].message
            const pageUrl = window.location.href
            const lineNumber = 0;
            const columnNumber = 0;
            const errorObj = arguments[0] && arguments[0].stack;
            const type = 0
            this._send(errorMsg, url, lineNumber, columnNumber, errorObj, pageUrl, type);
            return systemConsoleError.apply(console, arguments)
        }
    }

    /**
     * 重写window.onerror 事件
     * @private
     */
    _overwriteWindowError() {
        window.onerror = (errorMsg, url, lineNumber, columnNumber, errorObj) => {
            const pageUrl = window.location.href
            const errorStack = errorObj ? errorObj.stack : null
            const type = 1
            this._send(errorMsg, url, lineNumber, columnNumber, errorStack, pageUrl, type)
        }
    }

    _send(origin_errorMsg, origin_url, origin_lineNumber, origin_columnNumber, origin_errorObj, pageUrl, type) {
        const url = 'http://localhost:54321/jsError'
        const params = {
            m: origin_errorMsg,
            u: origin_url,
            l: origin_lineNumber,
            c: origin_columnNumber,
            p: pageUrl,
            k: window.document.title,
            t: type
        }
        this._http(url, params)
    }

}

// new JSError().start()

export default JSError
