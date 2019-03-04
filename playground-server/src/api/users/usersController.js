const Account = require('database/models/account');

exports.getProfile = async (ctx) => {
  const { username } = ctx.params;
  // 계정 찾기

  let account;
  try {
    account = await Account.findByUserName(username);
  } catch (e) {
    ctx.throw(500, e);
  }

  if(!account) {
    ctx.status = 404; // 찾는게 없음
    return;
  }

  ctx.body = {
    profile: account.profile,
    thoughtCount: account.thoughtCount
  };
};

exports.getThumbnail = async (ctx) => {
  const { username } = ctx.params;
  let account;

  try {
    account = await Account.findByUserName(username);
  } catch (e) {
    ctx.throw(500, e);
  }

  if(!account) {
    ctx.status = 404;
    return;
  }

  // 썸네일 주소로 리다이렉트
  ctx.redirect(account.profile.thumbnail);
  // console.log(account.profile.thumbnail); 썸 네일 경로가 담겨져 있음
};