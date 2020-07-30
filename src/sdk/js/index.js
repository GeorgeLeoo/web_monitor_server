/**
 * 页面JS错误监控
 */
function recordJavaScriptError () {
    // 重写console.error, 可以捕获更全面的报错信息
    var oldError = console.error;
    console.error = function () {
        // console.log('console.error')
        // arguments的长度为2时，才是error上报的时机
        // if (arguments.length < 2) return;
        var errorMsg = arguments[0] && arguments[0].message;
        var url = window.location.herf;
        var lineNumber = 0;
        var columnNumber = 0;
        var errorObj = arguments[0] && arguments[0].stack;
        if (!errorObj) errorObj = arguments[0];
        // 如果onerror重写成功，就无需在这里进行上报了
        siftAndMakeUpMessage(errorMsg, url, lineNumber, columnNumber, errorObj);
        return oldError.apply(console, arguments);
    };

    // 重写 onerror 进行jsError的监听
    window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObj) {
        // console.log('window.onerror')
        // 后端使用 fs 按行读取文件，就等定位到源码哪里错误 读取报错的三行（往前再两行）
        // 行数为1，压缩文件 为更加准确定位位置，可以使用按照分号换行
        var errorStack = errorObj ? errorObj.stack : null
        // console.log(errorStack)
        siftAndMakeUpMessage(errorMsg, url, lineNumber, columnNumber, errorStack)
    }

    function siftAndMakeUpMessage (origin_errorMsg, origin_url, origin_lineNumber, origin_columnNumber, origin_errorObj) {
        console.log(origin_errorMsg, origin_url, origin_lineNumber, origin_columnNumber, origin_errorObj)
        var errorMsg = origin_errorMsg ? origin_errorMsg : ''
        var errorObj = origin_errorObj ? origin_errorObj : ''
        var errorType = ''
        if (errorMsg) {
            var errorStackStr = JSON.stringify(errorObj)
            errorType = errorStackStr.split(': ')[0].replace('"', '')
        }
        var s = document.createElement('script')
        s.async = 1
        s.src=`http://localhost:54321/jsError?m=${origin_errorMsg}&u=${origin_url}&l=${origin_lineNumber}&c=${origin_columnNumber}`
        document.body.appendChild(s)
        s.onload = function () {
            document.body.removeChild(s)
        }
        // console.log(errorType + ': ' + errorMsg, errorObj)
        // var javaScriptErrorInfo = new JavaScriptErrorInfo(JS_ERROR, errorType + ": " + errorMsg, errorObj);
        // javaScriptErrorInfo.handleLogInfo(JS_ERROR, javaScriptErrorInfo);
    }
}

recordJavaScriptError()
