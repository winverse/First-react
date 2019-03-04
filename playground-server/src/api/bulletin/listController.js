const Post = require('database/models/bulletinPost');
const Joi = require('joi');

exports.list = async (ctx) => {
  const page = parseInt(ctx.query.page || 1, 10);

  if(page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find().sort({ _id: -1 }).limit(10).skip((page - 1) * 10).lean().exec();
    const postCount = await Post.count().exec();

    // const postsList = posts.map((post) => {
    //   let parsedText = (post.text).toString();

    // const images = [];
    // let resultStr;
    // let initialNumber = parsedText.search('src');
    // let newStr = '';

    // if(initialNumber > 0) {
    //   for(let i = initialNumber; i < parsedText.length; i++) {
    //     if(newStr.lastIndexOf('"') > 100 && parsedText.charAt(i) === '"') {
    //       break;
    //     } else {
    //       const selectedChar = parsedText.charAt(i); // 
    //       newStr += selectedChar;
    //     }
    //   }
    //   images.push(newStr);
    // }

    ctx.body = posts;
    ctx.set('last-page', Math.ceil(postCount / 10));
  } catch (e) {
    ctx.throw(500, e);
  }
};