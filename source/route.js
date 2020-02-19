import fs from 'fs';
import path from 'path';
import { Response } from './response.js';

export class Router {
    /**
     * 
     */
    constructor() { }

    /**
     * 
     */
    async route(context) {
        let location = context.request.path.split('/').filter(i => i.length > 0);
        let controller = location[0] || 'index';
        let action = location[1] || 'index';
        let filename = path.resolve(`source/controller/${controller}.js`);
        if (fs.existsSync(filename)) {
            let module = await import(`./controller/${controller}.js`);
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

export const router = new Router();

/**
 * 
 */
export default async (context, next) => {
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
};