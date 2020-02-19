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
        let m = item.match(/name=\"(.+?)\"\s*(?:\r\n)+(.+?)\r\n/);
        data[m[1]] = m[2];
    }
    return data;
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

    }
    await next();
};