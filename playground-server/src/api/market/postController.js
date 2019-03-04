const Post = require('database/models/marketPost');

exports.getPost = async (ctx) => {
  const { id } = ctx.params;
  
  if(!id) {
    ctx.status = 400; // Bad request;
    return;
  }

  try {
    const projection = {
      title: true,
      content: true,
      _id: true,
      createAt: true,
      likesCount: true,
      author: true,
      viewing: true,
      price: true
    };

    const post = await Post.findByIdAndUpdate(id, {
      $inc: { viewing: 1 }
    }, {
      new: true,
      projection
    }).exec();
    
    if(!post) {
      ctx.status = 404; // Not found;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.removePost = async (ctx) => {
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