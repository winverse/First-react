const Router = require('koa-router');

const auth = new Router();

const registerCtrl = require('./registerController');
const loginCtrl = require('./loginController');

// urlPath  '/api/auth'
auth.post('/register', registerCtrl.register);
auth.get('/exists/:key(userid|username)/:value', registerCtrl.exists);

auth.get('/check', loginCtrl.check);
auth.post('/logout', loginCtrl.logout);
auth.post('/login', loginCtrl.login);

module.exports = auth;