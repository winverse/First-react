const Account = require('database/models/account');
const HuremPost = require('database/models/huremPost');
const ObjectId = require('mongoose').Types.ObjectId;
const redis = require('redis');
const publisher = redis.createClient();

const Joi = require('joi');

exports.write = async (ctx) => {
  
  // 유저 검증하기
  const { user } = ctx.request;
  if(!user) {
    ctx.status = 403; // forbidden
    return;
  }

  let account;
  try {
    account = await Account.findById(user._id).exec();
  } catch (e) {
    console.log(`write`, e);
    ctx.throw(500, e);
  }

  if(!account) {
    ctx.status = 403; // forbidden
    return;
  }

  const count = account.thoughtCount + 1;

  // 요청 데이터 스키마 검증하기

  const schema = Joi.object().keys({
    content: Joi.string().min(5).max(1000).required() // 5자~ 1000자
  });

  const result = Joi.validate(ctx.request.body, schema);
  if(result.error) {
    ctx.status = 400; // Bad request
    return;
  }

  const { content } = ctx.request.body;

  // 포스트 write 호출
  let post;
  try {
    post = await HuremPost.write({
      count,
      userName: user.profile.userName,
      content
    });
    await account.increseThoughtCount();
  } catch (e) {
    ctx.throw(500, e);
  }

  // post 에 liked 값을 false로 설정

  post = post.toJSON();
  // delete post.likes;
  post.liked = false;

  // 포스트 정보를 반환

  ctx.body = post;
  // 데이터를 리덕스 형식으로 전송
  publisher.publish('huremList', JSON.stringify({
    type: 'huremList/RECEIVE_NEW_POST',
    payload: post
  }));
};

exports.list = async (ctx) => {
  const { cursor, username } = ctx.query; // URL 쿼리에서 cursor와 userName 값을 읽는다.
  // ObjectId 검증
  if (cursor && !ObjectId.isValid(cursor)) {
    ctx.status = 400; // Bad  request
    return;
  }

  // API를 호출한 유저의 정보를 가져옵니다.
  const { user } = ctx.request;
  const self = user ? user.userName : null; // 로그인한 유저라면 Username 값을 self에 넣어 줍니다.

  let posts = null;
  try {
    posts = await HuremPost.list({ cursor, username, self });
  } catch (e) {
    ctx.throw(500, e);
  }
  
  const next = posts.length === 20 ? `/api/hurem/posts/?${username ? `username=${username}&` : ''}cursor=${posts[19]._id}` : null;

  ctx.body = {
    next,
    data: posts
  };
};