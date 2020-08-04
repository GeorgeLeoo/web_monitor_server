import JSError from './JSError';
import Base from './Base';

/**
 * 页面接口请求监控
 */
function recordHttpLog(props) {

    // 监听ajax的状态
    function ajaxEventTrigger(event) {
        const ajaxEvent = new CustomEvent(event, {detail: this});
        window.dispatchEvent(ajaxEvent);
    }

    const oldXHR = window.XMLHttpRequest;

    function newXHR() {
        const realXHR = new oldXHR();
        realXHR.addEventListener('loadstart', function () {
            ajaxEventTrigger.call(this, 'ajaxLoadStart');
        }, false);
        realXHR.addEventListener('loadend', function () {
            ajaxEventTrigger.call(this, 'ajaxLoadEnd');
        }, false);
        // 此处的捕获的异常会连日志接口也一起捕获，如果日志上报接口异常了，就会导致死循环了。
        // realXHR.onerror = function () {
        //   siftAndMakeUpMessage("Uncaught FetchError: Failed to ajax", WEB_LOCATION, 0, 0, {});
        // }
        return realXHR;
    }

    function handleHttpResult(i, tempResponseText) {
        // console.log(tempResponseText)
        if (!timeRecordArray[i] || timeRecordArray[i].uploadFlag === true) {
            return;
        }
        let responseText = '';
        try {
            // responseText = tempResponseText ? JSON.stringify((JSON.parse(tempResponseText))) : '';
            responseText = tempResponseText ? JSON.stringify((JSON.parse(tempResponseText))).substring(0, 20) + '... }' : '';
        } catch (e) {
            responseText = '';
        }
        const simpleUrl = timeRecordArray[i].simpleUrl;
        const currentTime = new Date().getTime();
        const url = timeRecordArray[i].event.detail.responseURL;
        const status = timeRecordArray[i].event.detail.status;
        const statusText = timeRecordArray[i].event.detail.statusText;
        const loadTime = currentTime - timeRecordArray[i].timeStamp;
        // console.log(simpleUrl, url, status, statusText, '发起请求', '', timeRecordArray[i].timeStamp, 0)
        // console.log(simpleUrl, url, status, statusText, '请求返回', responseText, currentTime, loadTime)
        _send(simpleUrl, url, status, statusText, '发起请求', '', timeRecordArray[i].timeStamp, 0)
        _send(simpleUrl, url, status, statusText, '请求返回', responseText, timeRecordArray[i].timeStamp, loadTime)
        // if (!url || url.indexOf(HTTP_UPLOAD_LOG_API) != -1) return;
        // const httpLogInfoStart = new HttpLogInfo(HTTP_LOG, simpleUrl, url, status, statusText, "发起请求", "", timeRecordArray[i].timeStamp, 0);
        // httpLogInfoStart.handleLogInfo(HTTP_LOG, httpLogInfoStart);
        // const httpLogInfoEnd = new HttpLogInfo(HTTP_LOG, simpleUrl, url, status, statusText, "请求返回", responseText, currentTime, loadTime);
        // httpLogInfoEnd.handleLogInfo(HTTP_LOG, httpLogInfoEnd);
        // 当前请求成功后就，就将该对象的uploadFlag设置为true, 代表已经上传了
        timeRecordArray[i].uploadFlag = true;
    }

    const timeRecordArray = [];
    window.XMLHttpRequest = newXHR;
    window.addEventListener('ajaxLoadStart', function (e) {
        const tempObj = {
            timeStamp: new Date().getTime(),
            event: e,
            simpleUrl: window.location.href.split('?')[0].replace('#', ''),
            uploadFlag: false,
        }
        timeRecordArray.push(tempObj)
    });

    window.addEventListener('ajaxLoadEnd', function () {
        for (let i = 0; i < timeRecordArray.length; i++) {
            // uploadFlag == true 代表这个请求已经被上传过了
            if (timeRecordArray[i].uploadFlag === true) continue;
            if (timeRecordArray[i].event.detail.status > 0) {
                const rType = (timeRecordArray[i].event.detail.responseType + '').toLowerCase()
                if (rType === 'blob') {
                    (function (index) {
                        const reader = new FileReader();
                        reader.onload = function () {
                            const responseText = reader.result;//内容就在这里
                            handleHttpResult(index, responseText);
                        }
                        try {
                            reader.readAsText(timeRecordArray[i].event.detail.response, 'utf-8');
                        } catch (e) {
                            handleHttpResult(index, timeRecordArray[i].event.detail.response + '');
                        }
                    })(i);
                } else {
                    const responseText = timeRecordArray[i].event.detail.responseText;
                    handleHttpResult(i, responseText);
                }
            }
        }
    });

    function _send(simpleUrl, url, status, statusText, type, responseText, timeStamp, ms) {
        const apiUrl = 'http://localhost:54321/httpInfo'
        const params = {
            s: simpleUrl,
            u: url,
            a: status,
            e: statusText,
            t: type,
            r: responseText,
            p: timeStamp,
            m: ms,
        }
        _http(apiUrl, params)
    }

    function _http(url, params) {
        new Base(props)._http(url, params)
    }
}

// recordHttpLog()

class RecordHttpLog {
    constructor(props) {
        this.props = props
    }


    start() {
        recordHttpLog(this.props)
    }
}

export default RecordHttpLog
