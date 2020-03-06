import 'colors';
import fs from 'fs';
import url from 'url';
import path from 'path';
import dotenv from 'dotenv';
import serve from 'koa-static';
import app from './app.js';
import route from './basic/route.js';
import request from './basic/request.js';

const here = url.fileURLToPath(import.meta.url);
const root = path.dirname(here);

dotenv.config();
app.use(serve(url.resolve(root, 'public')));
app.use(request);
app.use(route(root));

if (!fs.existsSync('./data/user.db')) {
    import('./source/script/initdb.js');
}

const port = process.env.SERVER_PORT || 80;
const host = `http://localhost:${port}`;
console.log(`[index] => ${host}`.green);
console.log(`[login] => ${host}/login`.green);

app.listen(port);
