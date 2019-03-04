const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comment = new Schema({
  createAt: {
    type: Date,
    default: Date.now
  },
  userName: String,
  text: String
});

const HuremPost = new Schema({
  createAt: {
    type: Date,
    default: Date.now
  },
  count: Number,
  userName: String,
  content: String, // hurem text 
  likesCount: { type: Number, defualt: 0 }, // 좋아요 개수
  likes: { type: [String], default: [] }, // 좋아요한 유저 목록
  comment: { // 댓글
    type: [Comment],
    defualt: []
  } 
});

HuremPost.statics.write = function ({ count, userName, content }) {
  const HuremPost = new this({
    count, userName, content
  });
  return HuremPost.save();
};

HuremPost.statics.list = function ({ cursor, userName, self }) { // 여기서 self는 로그인하는 사람 아이디
  
  // query 유형에 따라서 유동적으로 데이터를 반환함
  const query = Object.assign(
    {},
    cursor ? { _id: { $lt: cursor } } : {},
    userName ? { userName } : {}
  );
 
  // API에서 호출한 userName (self) 값이 존재하면 likes에 해당 username이 있는지 확인

  const projection = self ? {
    count: true,
    userName: true,
    content: true,
    comment: true, 
    likes: {
      '$elemMacth': {
        '$eq': self
      }
    },
    likesCount: true,
    createAt: true
  } : {};
 
  return this.find(query, projection).sort({ _id: -1 }).limit(20).exec();
};

HuremPost.statics.like = function ({ _id, userName }) { // 좋아요 작업시에, _id는 글의 id 값이고,  userName은 좋아요 한 사람의 userName
  return this.findByIdAndUpdate(_id, {
    $inc: { likesCount: 1 },
    $push: { likes: userName } // 좋아요 배열에 값 넣기
  }, {
    new: true,
    select: 'likesCount' // _id로 조회한 값 중에서 likeCount만 가져오기 
  }).exec();
};

HuremPost.statics.unlike = function ({ _id, userName }) { // 싫어요 작업시에
  return this.findByIdAndUpdate(_id, {
    $inc: { likesCount: -1 },
    $pull: { likes: userName } // 좋아요 배열에서 명단 빼기
  }, {
    new: true,
    select: 'likesCount' // _id로 조회한 값 중에서 likeCount만 가져오기 
  }).exec();
};

HuremPost.methods.writeComment = function({ userName, text }) { // 댓글 추가시
  this.comment.unshift({ // unshift 배열 맨 앞에 값을 추가한다.
    userName, text
  });
  return this.save();
};

module.exports = mongoose.model('HuremPost', HuremPost);