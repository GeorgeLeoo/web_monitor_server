class HttpInfo {
    constructor() {
        this.timeRecordArray = [];
    }

    start() {
        this._init()
    }

    _ajaxEventTrigger(event) {
        const ajaxEvent = new CustomEvent(event, {detail: this});
        window.dispatchEvent(ajaxEvent);
    }

    _newXHR() {
        const realXHR = new this.SystemXHR();
        realXHR.addEventListener('loadstart', () => {
            this._ajaxEventTrigger.call(this, 'ajaxLoadStart');
        }, false);
        realXHR.addEventListener('loadend', () => {
            this._ajaxEventTrigger.call(this, 'ajaxLoadEnd');
        }, false);
        // 此处的捕获的异常会连日志接口也一起捕获，如果日志上报接口异常了，就会导致死循环了。
        // realXHR.onerror = function () {
        //   siftAndMakeUpMessage("Uncaught FetchError: Failed to ajax", WEB_LOCATION, 0, 0, {});
        // }
        return function XMLHttpRequest() {
            return realXHR
        };
    }

    _init() {
        this.SystemXHR = window.XMLHttpRequest
        console.log(this.SystemXHR)
        console.log(this._newXHR())
        window.XMLHttpRequest = this._newXHR;
        window.addEventListener('ajaxLoadStart', (e) => {
            const tempObj = {
                timeStamp: new Date().getTime(),
                event: e,
                simpleUrl: window.location.href.split('?')[0].replace('#', ''),
                uploadFlag: false,
            }
            this.timeRecordArray.push(tempObj)
        });

        window.addEventListener('ajaxLoadEnd', () => {
            for (let i = 0; i < this.timeRecordArray.length; i++) {
                // uploadFlag == true 代表这个请求已经被上传过了
                if (this.timeRecordArray[i].uploadFlag === true) continue;
                if (this.timeRecordArray[i].event.detail.status > 0) {
                    const rType = (this.timeRecordArray[i].event.detail.responseType + '').toLowerCase()
                    if (rType === 'blob') {
                        ((index) => {
                            const reader = new FileReader();
                            reader.onload = () => {
                                const responseText = reader.result;//内容就在这里
                                this.handleHttpResult(index, responseText);
                            }
                            try {
                                reader.readAsText(this.timeRecordArray[i].event.detail.response, 'utf-8');
                            } catch (e) {
                                this.handleHttpResult(index, this.timeRecordArray[i].event.detail.response + '');
                            }
                        })(i);
                    } else {
                        const responseText = this.timeRecordArray[i].event.detail.responseText;
                        this.handleHttpResult(i, responseText);
                    }
                }
            }
        });
    }

    handleHttpResult(i, tempResponseText) {
        if (!this.timeRecordArray[i] || this.timeRecordArray[i].uploadFlag === true) {
            return;
        }
        let responseText = '';
        try {
            // responseText = tempResponseText ? JSON.stringify(utils.encryptObj(JSON.parse(tempResponseText))) : '';
            responseText = tempResponseText ? JSON.stringify((JSON.parse(tempResponseText))) : '';
        } catch (e) {
            responseText = '';
        }
        const simpleUrl = this.timeRecordArray[i].simpleUrl;
        const currentTime = new Date().getTime();
        const url = this.timeRecordArray[i].event.detail.responseURL;
        const status = this.timeRecordArray[i].event.detail.status;
        const statusText = this.timeRecordArray[i].event.detail.statusText;
        const loadTime = currentTime - this.timeRecordArray[i].timeStamp;
        console.log(simpleUrl, url, status, statusText, '发起请求', '', this.timeRecordArray[i].timeStamp, 0)
        console.log(simpleUrl, url, status, statusText, '请求返回', responseText, currentTime, loadTime)
        // if (!url || url.indexOf(HTTP_UPLOAD_LOG_API) != -1) return;
        // const httpLogInfoStart = new HttpLogInfo(HTTP_LOG, simpleUrl, url, status, statusText, "发起请求", "", timeRecordArray[i].timeStamp, 0);
        // httpLogInfoStart.handleLogInfo(HTTP_LOG, httpLogInfoStart);
        // const httpLogInfoEnd = new HttpLogInfo(HTTP_LOG, simpleUrl, url, status, statusText, "请求返回", responseText, currentTime, loadTime);
        // httpLogInfoEnd.handleLogInfo(HTTP_LOG, httpLogInfoEnd);
        // 当前请求成功后就，就将该对象的uploadFlag设置为true, 代表已经上传了
        this.timeRecordArray[i].uploadFlag = true;
    }

    _send(typeName, sourceUrl) {
        const url = 'http://localhost:54321/httpInfo'
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

new HttpInfo().start()
