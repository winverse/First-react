const Router = require('koa-router');

const api = new Router();

const auth = require('./auth');
const users = require('./users');
const hurem = require('./hurem');
const bulletin = require('./bulletin');
const market = require('./market');

api.use('/auth', auth.routes());
api.use('/users', users.routes());
api.use('/hurem', hurem.routes());
api.use('/bulletin', bulletin.routes());
api.use('/market', market.routes());

module.exports = api;