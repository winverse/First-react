const Router = require('koa-router');

const posts = new Router();

const postCtrl = require('./postsController');

// URL Path  '/api/hurem/posts/'

posts.post('/', postCtrl.write);
posts.get('/', postCtrl.list);

module.exports = posts;