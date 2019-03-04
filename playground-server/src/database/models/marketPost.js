const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = require('mongoose').Types;

const autoIncrement = require('mongoose-auto-increment');

const Comment = new Schema({
  stage: {
    type: Number,
    default: 0
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  author: String,
  message: String
});

const Post = new Schema({
  createAt: {
    type: Date,
    default: Date.now
  },
  author: String,
  title: String,
  content: String,
  price: {
    type: String,
    default: 0
  },
  thumbnail: String,
  likes: { 
    type: [String], default: []
  },
  likesCount: { type: Number, default: 0 },
  comment: {
    type: [Comment],
    default: []
  },
  viewing: {
    type: Number, default: 0
  }
});

Comment.add({ comments: [Comment] });

Post.statics.write = function({ author, title, content, price }) {
  
  let thumbnail = '';
  if(content.indexOf('https') > -1) {
    let startAt = content.split('"');
    for(let i = 0; i < startAt.length; i++) {
      if(startAt[i].indexOf('https') > -1) {
        thumbnail += startAt[i];
        break;
      }
    }
  };

  const Post = new this({
    author,
    title,
    content,
    thumbnail,
    price
  });
  return Post.save();
};

Post.statics.list = function({ username, cursor }) {
  const query = Object.assign(
    {},
    cursor ? { _id: { $lt: cursor } } : {},
    username ? { username } : {}
  );

  const projection = {
    _id: true,
    author: true,
    thumbnail: true,
    createAt: true,
    likesCount: true,
    viewing: true
  };

  return this.find(query, projection).sort({ _id: -1 }).limit(20).exec();
};

Post.methods.writeComment = function({ author, message }) {
  this.comment.push({
    author,
    message
  });
  return this.save();
};

Post.methods.writeRecomment = function ({ author, message, commentId }) {
  const parseId = JSON.stringify(commentId);
  const index = this.comment.findIndex((recomment) => JSON.stringify(recomment._id) === parseId);
  this.comment[index].get('comments').push({
    author,
    message
  });
  return this.save();
};

Post.plugin(autoIncrement.plugin, 'Post');

module.exports = mongoose.model('marketPost', Post);