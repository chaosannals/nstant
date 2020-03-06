import Koa from 'koa';
import websockify from 'koa-websocket';
import token from './model/token.js';

const app = websockify(new Koa());

app.ws.use((context, next) => {
    context.websocket.on('message', async m => {
        try {
            let t = context.cookies.get('token');
            let u = await token.find({ token: t });
            for (var s of app.ws.server.clients) {
                if (context.websocket != s) {
                    s.send(JSON.stringify({
                        user: u && u.user && u.user.username,
                        message: JSON.parse(m).message
                    }));
                }
            }
        } catch (e) {
            console.log(e);
        }
    });
    return next(context);
});

export default app;