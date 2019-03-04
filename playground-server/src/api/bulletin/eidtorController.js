const Account = require('database/models/account');
const Post = require('database/models/bulletinPost');
const Joi = require('joi');

exports.write = async (ctx) => {
  const { user } = ctx.request;
  if(!user) {
    ctx.status = 403; // forbidden;
    return;
  }

  let account;
  try {
    account = await Account.findById(user._id).exec();
  } catch (e) {
    ctx.throw(500, e);
  }

  if(!account) {
    ctx.status = 403; // forbidden
    return;
  }

  const schema = Joi.object().keys({
    author: Joi.string().required(),
    text: {
      values: Joi.string().min(12).required()
    },
    title: Joi.string().min(3).max(100).required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if(result.error) {
    ctx.status = 400; // Bad request;
    return;
  }

  const { author, text, title } = ctx.request.body;
  let post;
  try {
    post = await Post.write({ 
      author, 
      text,
      title
    });
  } catch (e) {
    ctx.throw(500, e);
  }
  ctx.body = post;
};

// edit 

exports.edit = async (ctx) => {
  const { user } = ctx.request;
  if(!user) {
    ctx.status = 403; // forbidden;
    return;
  }

  let account;
  try {
    account = await Account.findById(user._id).exec();
  } catch (e) {
    ctx.throw(500, e);
  }

  if(!account) {
    ctx.status = 403; // forbidden
    return;
  }

  const { id } = ctx.params;
  const { author, title, text } = ctx.request.body;

  try {
    const post = await Post.findByIdAndUpdate(id, {
      author,
      title,
      text
    }, {
      new: true
    }).exec();

    if(!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;

  } catch (e) {
    ctx.throw(500, e);
  }
};