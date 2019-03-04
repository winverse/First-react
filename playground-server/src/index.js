require('dotenv').config();

const {
  PORT: port
} = process.env;

const database = require('./database');

const { jwtMiddleware } = require('./lib/token');

database.connect();

const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const websockify = require('koa-websocket');

require('events').EventEmitter.prototype._maxListeners = 1000;

const app = websockify(new Koa());
const router = new Router();

const api = require('./api');
const ws = require('./ws');

app.use(koaBody({
  jsonLimit: '20mb',
  multipart: true
}));

app.use(jwtMiddleware);

router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());
app.ws.use(ws.routes()).use(ws.allowedMethods());

app.listen(port, () => {
  console.log(`Doren server is running, port number is ${port}`);
});