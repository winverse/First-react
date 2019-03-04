const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');

const { generateToken } = require('lib/token');

const {
  SECRET_KEY
} = process.env;

function hash(password) {
  return crypto.createHmac('sha512', SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
  profile: {
    thumbnail: { type: String, default: 'https://s3.ap-northeast-2.amazonaws.com/s3.images.doren.com/marketImages/20180423-ly5do-default-.thumbnail-.png' },
    userName: { type: String, unique: true }
  },
  userJob: String,
  userId: { type: String, unique: true },
  password: String,
  thoughtCount: { type: Number, default: 0 },
  point: { type: Number, default: 0 },
  createAt: { type: Date, default: Date.now },
  something: { type: Array, default: [] }
});

Account.statics.register = function({ userJob, userId, userName, password }) {
  const account = new this({
    profile: {
      userName: userName
    },
    userJob: userJob,
    userId: userId,
    password: hash(password)
  });
  return account.save();
};

Account.statics.findByUserName = function(userName) {
  return this.findOne({ 'profile.userName': userName }).exec();
};

Account.statics.findByUserId = function(userId) {
  return this.findOne({ 'userId': userId }).exec();
};

Account.statics.findByUserIdOrUserName = function({ userId, userName }) {
  return this.findOne({
    $or: [{ 'profile.userId': userId }, { userName: userName }]
  }).exec();
};

Account.methods.increseThoughtCount = function() {
  this.thoughtCount++;
  return this.save();
};

Account.methods.generateToken = function() {
  const payload = {
    _id: this._id,
    profile: this.profile
  };
  return generateToken(payload, 'account');
};

Account.methods.validatePassword = function(password) {
  const hashed = hash(password);
  return this.password === hashed;
};

module.exports = mongoose.model('Account', Account);