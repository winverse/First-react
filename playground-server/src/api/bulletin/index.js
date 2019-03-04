const Router = require('koa-router');

const bulletin = new Router();

const editorCtrl = require('./eidtorController');
const postCtrl = require('./postController');
const listCtrl = require('./listController');

// URL path: '/api/bulletn'
bulletin.post('/write', editorCtrl.write);
bulletin.get('/reads/:id', postCtrl.read);
bulletin.get('/posts/', listCtrl.list);
bulletin.patch('/editPost/:id', editorCtrl.edit);
bulletin.delete('/:id', postCtrl.remove);

module.exports = bulletin;
