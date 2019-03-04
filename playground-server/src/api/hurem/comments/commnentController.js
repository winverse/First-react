const Joi = require('joi');
const HuremPost = require('database/models/huremPost');
const { ObjectId } = require('mongoose').Types;

exports.comment = async (ctx) => {

  const { user } = ctx.request;
  if(!user) {
    ctx.status = 403; // forbidden;
    return;
  }

  const schema = Joi.object().keys({
    text: Joi.string().min(1).max(100).required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (!result) {
    ctx.status = 400; // bad request;
    return;
  }

  const { userName } = user.profile;
  const { postId } = ctx.params;
  const { text } = ctx.request.body;

  if(!ObjectId(postId)) {
    ctx.status = 400;
    return;
  };

  let post;
  try {
    post = await HuremPost.findById(postId);
  } catch (e) {
    ctx.throw(500, e);
  }

  if(!post) {
    ctx.status = 404; // not found;
    return;
  }
  try {
    await post.writeComment({
      text, userName
    });
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = post.comment;
};