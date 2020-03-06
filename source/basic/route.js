import fs from 'fs';
import url from 'url';
import path from 'path';
import { Response } from './response.js';

/**
 * 路由器
 * 
 */
export class Router {

    /**
     * 
     * @param {*} root 
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * 
     */
    async route(context) {
        let location = context.request.path.split('/').filter(i => i.length > 0);
        let controller = location[0] || 'index';
        let action = location[1] || 'index';
        let filename = path.resolve(this.root, 'controller', `${controller}.js`);
        if (fs.existsSync(filename)) {
            let link = url.pathToFileURL(filename);
            let module = await import(link);
            let constructor = module.default;
            let prototype = constructor.prototype;
            if (prototype.hasOwnProperty(action)) {
                let instance = new constructor();
                instance.context = context;
                return await prototype[action].call(instance, context);
            }
        }
        return null;
    }
}

/**
 * 
 */
export default root => {
    const router = new Router(root);
    return async (context, next) => {
        try {
            let response = await router.route(context);
            if (response instanceof Response) {
                response.respond(context);
            } else if (typeof (response) == 'string') {
                context.response.body = response;
            }
        } catch (e) {
            // console.log(e);
        }
        await next();
    }
};