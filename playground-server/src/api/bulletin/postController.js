const Post = require('database/models/bulletinPost');

const { ObjectId } = require('mongoose').Types;

exports.read = async (ctx) => {
  const { id } = ctx.params;
  if(!ObjectId.isValid(id)) {
    ctx.status = 400; // bad request;
    return;
  }

  try {
    const post = await Post.findById(id).exec();
    if(!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.remove = async (ctx) => {
  const { user } = ctx.request;
  
  if(!user) {
    ctx.status = 403; // forbidden;
    return;
  }

  const { id } = ctx.params;
  
  try {
    const post = await Post.findByIdAndRemove(id).exec();
    if(!post) {
      ctx.status = 404;
      return;
    }
    ctx.status = 204;

  } catch (e) {
    ctx.throw(500, e);
  }
};