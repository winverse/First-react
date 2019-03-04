const Router = require('koa-router');

const likes = new Router();

const likesCtrl = require('./likesController');

// URL path '/api/hurem/likes'

likes.post('/:postId', likesCtrl.like);
likes.delete('/:postId', likesCtrl.unlike);

module.exports = likes;