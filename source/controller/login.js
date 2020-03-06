import uuidv1 from 'uuid/v1.js';
import sha256 from 'crypto-js/sha256.js';
import user from '../model/user.js';
import token from '../model/token.js';
import { render, respond, redirect } from '../basic/response.js';

/**
 * 
 */
export default class LoginController {
    /**
     * 登录页面。
     * 
     */
    index(context) {
        let token = context.cookies.get('token');
        if (token) {
            return redirect('/panel');
        }
        return render('login');
    }

    /**
     * 验证登录信息。
     * 
     */
    async verify(context) {
        let un = context.request.data.username || '';
        let pw = context.request.data.password || '';
        let u = await user.find({ username: un, password: sha256(pw).toString() });
        if (u) {
            let t = uuidv1();
            context.cookies.set('token', t, {
                httpOnly: false,
            });
            await token.insert([{ token: t, user: u}]);
            return respond();
        } else {
            return respond({
                message: '密码或用户名错误'
            }, 400);
        }
    }
};