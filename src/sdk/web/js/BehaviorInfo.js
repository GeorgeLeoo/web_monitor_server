import Base from './Base';

class BehaviorInfo extends Base {
    constructor(props) {
        super(props);
        this.eventList = [
            'onabort',
            'onblur',
            'onchange',
            'onclick',
            'onclose',
            'oncontextmenu',
            'ondblclick',
            'onended',
            'onerror',
            'onfocus',
            'oninput',
            'onload',
            'onloadstart',
            'onreset',
            'onselect',
        ]
    }


    start() {
        this.recordBehavior()
    }

    /**
     * 用户行为记录监控
     * @private
     */
    recordBehavior() {
        // if (project && project.record && project.record == 1) {
        // 记录行为前，检查一下url记录是否变化
        // checkUrlChange();
        // 记录用户点击元素的行为数据
        this.eventList.map(event => {
            document[event] = e => {
                let className = '';
                let placeholder = '';
                let inputValue = '';
                const tagName = e.target.tagName;
                let innerText = '';
                if (e.target.tagName !== 'svg' && e.target.tagName !== 'use') {
                    className = e.target.className;
                    placeholder = e.target.placeholder || '';
                    inputValue = e.target.value || '';
                    innerText = e.target.innerText.replace(/\s*/g, '');
                    // 如果点击的内容过长，就截取上传
                    if (innerText.length > 200) innerText = innerText.substring(0, 100) + '... ...' + innerText.substring(innerText.length - 99, innerText.length - 1);
                    innerText = innerText.replace(/\s/g, '');
                }
                // console.log('click', className, placeholder, inputValue, tagName, innerText)
                this._send(event.substring(2), className, placeholder, inputValue, tagName, innerText)
                // const behaviorInfo = new BehaviorInfo(ELE_BEHAVIOR, "click", className, placeholder, inputValue, tagName, innerText);
                // behaviorInfo.handleLogInfo(ELE_BEHAVIOR, behaviorInfo);
            }
        })

        // }
    }

    _send(evName, className, placeholder, inputValue, tagName, innerText) {
        const url = 'http://localhost:54321/behaviorInfo'
        const params = {
            e: evName,
            c: className,
            p: placeholder,
            i: inputValue,
            t: tagName,
            n: innerText,
            u: window.location.href
        }
        this._http(url, params)
    }
}

// new BehaviorInfo().start()

export default BehaviorInfo
