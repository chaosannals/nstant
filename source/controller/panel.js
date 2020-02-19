import { render } from '../response.js';

export default class PanelController {
    /**
     * 
     */
    index() {
        return render('panel');
    }
}