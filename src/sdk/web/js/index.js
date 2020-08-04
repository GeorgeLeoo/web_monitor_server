import BehaviorInfo from './BehaviorInfo';
import HttpInfo from './HttpInfo';
import JSError from './JSError';
import SrcError from './SrcError';

class WEB_LOG {
    constructor(props) {
        // console.log(props)
        new BehaviorInfo(props).start()
        new HttpInfo(props).start()
        new JSError(props).start()
        new SrcError(props).start()
    }
}

window.WEB_LOG = WEB_LOG
// export default WEB_LOG
