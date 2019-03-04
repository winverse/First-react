const Router = require('koa-router');

const hurem = new Router();

// url path: /api/hurem

const posts = require('./posts');
const likes = require('./likes');
const comments = require('./comments');

hurem.use('/posts', posts.routes());
hurem.use('/likes', likes.routes());
hurem.use('/comments', comments.routes());

module.exports = hurem;