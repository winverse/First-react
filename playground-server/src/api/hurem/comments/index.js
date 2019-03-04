const Router = require('koa-router');

const comments = new Router();

const commentCtrl = require('./commnentController');

// URL path: '/api/hurem/comments';

// `/api/hurem/comments/${postId}`, { text }

comments.post('/:postId', commentCtrl.comment);

module.exports = comments;