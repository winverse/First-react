const Joi = require('joi');
const Account = require('database/models/account');

exports.check = async (ctx) => {
  const { user } = ctx.request;
  if(!user) {
    ctx.status = 403; // Forbidden
    return;
  }
  ctx.body = user.profile;
};

exports.login = async (ctx) => {
  const schema = Joi.object().keys({
    userId: Joi.string().required(),
    password: Joi.string().required()
  });
 
  const result = Joi.validate(ctx.request.body, schema);

  if(result.error) {
    console.log(`result error`);
    ctx.status = 400; // Bad request;
    return;
  }

  const { userId, password } = ctx.request.body;

  let account;

  try {
    account = await Account.findByUserId(userId);
  } catch(e) {
    ctx.throw(500, e);
  }

  if(!account || !account.validatePassword(password)) {
    ctx.status = 404;
    return;
  }

  let token;

  try{
    token = await account.generateToken();
  } catch (e) {
    throw(500, e);
  };

  ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 + 7 });
  ctx.body = account.profile;
};

exports.logout = async (ctx) => {
  ctx.cookies.set('access_token', null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
};