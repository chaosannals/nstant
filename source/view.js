import path from 'path';
import debug from 'debug';
import art from 'art-template';

/**
 * 渲染器
 * 
 */
export class Renderer {
    log;
    options;

    /**
     * 构造子。
     * 
     */
    constructor() {
        this.log = debug('render');
        this.options = {
            debug: process.env.NODE_ENV !== 'production'
        };
    }

    /**
     * 输出内容。
     * 
     */
    render(name, data) {
        let filename = path.resolve('source', 'view', name);
        let options = { ...this.options, filename };
        let render = art.compile(options);
        this.log(`render: ${filename}`);
        return render(data);
    }
}

const renderer = new Renderer();

export default renderer;