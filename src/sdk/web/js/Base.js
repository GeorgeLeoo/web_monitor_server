class Base {
    constructor(props) {
        this.props = props
    }

    _http(url, params) {
        let _url = url
        params = Object.assign(params, { _k: this.props.key, _u: this.props.uid })
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

export default Base
