const Router = require('koa-router');

const market = new Router();

const PostCtrl = require('./postController');
const EditorCtrl = require('./editorController');
const ListCtrl = require('./listController');
const CommentCtrl = require('./CommentController');

// API Path: `/api/market`

market.post('/upload', EditorCtrl.upload);
market.post('/write', EditorCtrl.write);
market.get('/getPosts/:id', PostCtrl.getPost);
market.get('/', ListCtrl.getList);
market.patch('/editPost/:id', EditorCtrl.editPost);
market.delete('/post/remove/:id', PostCtrl.removePost);

// COMMENT 
market.get('/comment/:id', CommentCtrl.getComment);
market.post('/comment/:id', CommentCtrl.submitComment);
market.post('/recomment/:id', CommentCtrl.submitRecomment);

module.exports = market;