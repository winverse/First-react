const Joi = require('joi');
const Account = require('database/models/account');

exports.register = async (ctx) => {
  const { userId, userName, password } = ctx.request.body;

  const schema = Joi.object().keys({
    userJob: Joi.string().required(),
    userId: Joi.string().min(4).max(10).required(),
    userName: Joi.string().min(2).max(10).required(),
    password: Joi.string().min(6).max(15).required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if(result.error) {
    console.log('Register validator error');
    ctx.status = 400; // Bad request;
    return;
  }

  let existing = null;

  try {
    existing = await Account.findByUserIdOrUserName({ userId, userName });
  } catch (e) {
    console.log(`existing error`);
    ctx.throw(500, e);
  }

  if(existing) {
    ctx.status = 409; // conflict
    ctx.body = {
      key: existing.userId === userId ? 'userIdError' : 'userNameError'
    };
    return false;
  }

  let account;
  let token;

  try {
    account = await Account.register(ctx.request.body);
    token = await account.generateToken();
  } catch (e) {
    console.log(`register await error`);
    ctx.throw(500, e);
  }

  ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
  ctx.body = account.profile;
};

exports.exists = async (ctx) => {
  const { key, value } = ctx.params;
  let account;
  try {
    account = await (key === 'userid' ? Account.findByUserId(value) : Account.findByUserName(value));
  } catch (e) {
    throw(500, e);
  }
  
  ctx.body = {
    exists: account !== null // true or false;
  };
};