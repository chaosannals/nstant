import 'colors';
import path from 'path';
import dotenv from 'dotenv';
import serve from 'koa-static';
import app from './app.js';
import route from './route.js';
import request from './request.js';

dotenv.config();
app.use(serve(path.resolve('public')));
app.use(request);
app.use(route);

const host = `http://localhost:${process.env.SERVER_PORT}`;
console.log(`index: ${host}`.green);
console.log(`login: ${host}/login`.green);

app.listen(process.env.SERVER_PORT);
