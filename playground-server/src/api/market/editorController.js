const AWS = require('aws-sdk');
const fs = require('fs');
const moment = require('moment');
const Joi = require('joi');

const Post = require('database/models/marketPost');
const Account = require('database/models/account');

const s3 = new AWS.S3();

exports.upload = async (ctx) => {
  const { file } = ctx.request.body.files;
  const { name } = file;

  if(!file) {
    ctx.status = 400;
    return;
  }

  const stats = fs.statSync(file.path);

  if(stats.size > 1024 * 1024 * 5) { // 5mb
    ctx.status = 413; 
    return;
  }

  function formatFileName(name) {
    const date = moment().format('YYYYMMDD');
    const randomString = Math.random().toString(36).substring(2, 7);
    const claenFileName = name.toLowerCase().replace(/[^a-z0-9가-힣]/g, '-.');
    const newFilename = `marketImages/${date}-${randomString}-${claenFileName}`;
    return newFilename.substring(0, 60);
  };

  const imagePath = formatFileName(name);

  const read = fs.createReadStream(file.path);
  const fileType = file.type;

  try {
    const response = await s3
      .upload({
        Bucket: 's3.images.doren.com',
        Key: imagePath,
        Body: read,
        ContentType: fileType,
        ACL: 'public-read'
      }).promise();

    ctx.body = imagePath;

    if(!response || !response.ETag) {
      console.log('error', response);
      ctx.status = 418;
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.write = async (ctx) => {
  const { user } = ctx.request;
  if(!user) {
    ctx.status = 403;
    return;
  }

  try {
    const account = await Account.findById(user._id).exec();
    if(!account) {
      ctx.status = 403;
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }

  const schema = Joi.object().keys({
    author: Joi.string().required(),
    content: Joi.string().min(12).required(),
    title: Joi.string().min(4).max(100).required(),
    price: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if(result.error) {
    console.log(result.error);
    ctx.status = 400; // Bad request;
    return;
  }

  const { author, title, content, price } = ctx.request.body;

  try {
    const post = await Post.write({
      author,
      title,
      content,
      price
    });
    ctx.body = post._id;
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.editPost = async (ctx) => {
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
    content: Joi.string().min(12).required(),
    title: Joi.string().min(4).max(100).required(),
    price: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if(result.error) {
    ctx.status = 400; // Bad request;
    return;
  }

  const { id } = ctx.params;
  const { author, title, content, price } = ctx.request.body;

  try {
    const post = await Post.findByIdAndUpdate(id, {
      author,
      title,
      content,
      price
    }, {
      new: true,
      projection: {
        author: true,
        title: true,
        content: true,
        viewing: true,
        likesCount: true,
        createAt: true,
        price: true
      }
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