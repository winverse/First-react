const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
  author: String,
  title: String,
  text: Object,
  createAt: {
    type: Date,
    default: Date.now
  }
});

Post.statics.write = function ({ author, text, title }) {
  const Post = new this({
    author, 
    text,
    title
  });
  return Post.save();
};

module.exports = mongoose.model('bulletinPost', Post);