import { redirect } from '../basic/response.js';

export default class IndexController {
    /**
     * 
     */
    index(context) {
        let token = context.cookies.get('token');
        if (token) {
            return redirect('/panel');
        }
        return redirect('/login')
    }
}