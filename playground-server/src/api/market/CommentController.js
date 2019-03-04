const Post = require('database/models/marketPost');
const Joi = require('joi');

exports.getComment = async(ctx) => {
  const { id } = ctx.params;
  if(!id) {
    ctx.status = 403;
    return;
  }

  try {
    const post = await Post.findById(id, 
      {
        comment: true
      }
    ).exec();
    if(!post) {
      ctx.status = 404;
      return;
    }
    
    ctx.body = post.comment;
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.submitComment = async(ctx) => {
  const { user } = ctx.request;
  if(!user) {
    ctx.status = 403; // forbidden;
    return;
  }
  
  const { id } = ctx.params;
  
  if(!id) {
    ctx.status = 403;
    return;
  }

  const schema = Joi.object().keys({
    value: Joi.string().min(3).max(100).required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if(result.error) {
    ctx.status = 400; // Bad request; 
    return;
  }

  const { value } = ctx.request.body;

  try {
    const post = await Post.findById(id).exec();

    if(!post) {
      ctx.status = 404;
      return;
    }
    await post.writeComment({
      author: user.profile.userName,
      message: value
    });
    const index = post.comment.length;
    ctx.body = post.comment[index - 1];
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.submitRecomment = async(ctx) => {
  const { user } = ctx.request;
  if(!user) {
    ctx.status = 403; // forbidden;
    return;
  }
  
  const { id: commentId } = ctx.params;
  
  if(!commentId) {
    ctx.status = 403;
    return;
  }

  const { value, postId } = ctx.request.body;

  const schema = Joi.object().keys({
    value: Joi.string().min(2).max(100).required(),
    postId: Joi.required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if(result.error) {
    ctx.status = 400; // Bad request; 
    return;
  }

  try {
    const post = await Post.findById(postId).exec();

    await post.writeRecomment({
      commentId,
      author: user.profile.userName,
      message: value
    });
    ctx.body = post.comment;
    
  } catch (e) {
    ctx.throw(500, e);
  }
};