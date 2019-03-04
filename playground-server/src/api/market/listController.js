const Post = require('database/models/marketPost');

exports.getList = async (ctx) => {
  const { username, cursor } = ctx.query;
  try {
    const posts = await Post.list({ username, cursor });
    const next = posts.length === 20 ? `/api/market/?${username ? `username=${username}&` : ``}cursor=${posts[19]._id}` : null;

    ctx.body = {
      next, 
      data: posts
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};