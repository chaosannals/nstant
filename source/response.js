import view from './view.js';

/**
 * 
 */
export class Response {

}

/**
 * HTML 模板渲染响应
 * 
 */
export class HTMLResponse extends Response {
    /**
     * 
     */
    constructor(source, data) {
        super();
        this.source = source;
        this.data = data;
    }

    /**
     * 
     * @param {*} context 
     */
    respond(context) {
        let html = view.render(this.source, this.data);
        context.response.body = html;
    }
}

/**
 * JSON 数据响应
 * 
 */
export class JSONResponse extends Response {
    /**
     * 
     */
    constructor(data, status) {
        super();
        this.data = data;
        this.status = status || 200;
    }

    /**
     * 
     * @param {*} context 
     */
    respond(context) {
        context.response.body = this.data;
        context.response.status = this.status;
    }
}

/**
 * 重定向响应
 * 
 * @param {*} source 
 * @param {*} data 
 */
export class RedirectResponse extends Response {
    /**
     * 
     */
    constructor(url) {
        super();
        this.url = url;
    }

    respond(context) {
        context.redirect(this.url);
    }
}

export function render(source, data) {
    return new HTMLResponse(source, data);
}
export function respond(data, status) {
    return new JSONResponse(data, status);
}
export function redirect(url) {
    return new RedirectResponse(url);
}