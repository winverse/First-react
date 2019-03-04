const Router = require('koa-router');

const users = new Router();

const usersCtrl = require('./usersController');

// API path '/api/users'

users.get('/:username', usersCtrl.getProfile);
users.get('/thumbnail/:username', usersCtrl.getThumbnail);

module.exports = users;