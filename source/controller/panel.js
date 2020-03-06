import { render } from '../basic/response.js';

export default class PanelController {
    /**
     * 
     */
    index() {
        return render('panel');
    }
}