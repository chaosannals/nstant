/**
 * 获取请求数据。
 * 
 * @param {*} context 
 */
function readRequestBody(context) {
    return new Promise((resolve, reject) => {
        let buffer = [];
        context.req.addListener('data', chunk => {
            buffer.push(chunk);
        });
        context.req.addListener('end', () => {
            let data = Buffer.concat(buffer);
            resolve(data.toString());
        });
    });
}

/**
 * 读取 FormData 格式的数据。
 * 
 */
function readFormData(body) {
    let data = {};
    let items = body.split(/------.+?\r\n/).filter(i => i);
    for (let item of items) {
        let m = item.match(/name=\"(.+?)\"\s*(?:\r\n)+(.+?)?\r\n/);
        if (m) {
            data[m[1]] = m[2] || null;
        }
    }
    return data;
}

/**
 * 读取简单信息。
 * 
 */
function readSimpleData(body) {
    let data = {};
    let items = body.split('&');
    for (let item of items) {
        let pair = item.split('=');
        let key = pair[0];
        let value = pair[1];
        if (key.indexOf('[]') >= 0) {
            if (!Array.isArray(data[key])) {
                data[key] = [];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    }
}

export default async (context, next) => {
    let type = context.request.type;
    let body = await readRequestBody(context);
    context.request.body = body;
    if (/form-?data/i.test(type)) {
        context.request.data = readFormData(body);
    } else if (/json/i.test(type)) {
        context.request.data = JSON.parse(body);
    } else {
        context.request.data = readSimpleData(body);
    }
    await next();
};