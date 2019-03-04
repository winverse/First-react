const HuremPost = require('database/models/huremPost');

exports.like = async (ctx) => {
  const { user } = ctx.request;

  if(!user) {
    ctx.status = 403; // forbbiden
    return; 
  }

  //  포스트 찾기
  const { postId } = ctx.params;
  const { userName } = user.profile;
  let post;
  try {
    post = await HuremPost.findById(postId, { // Projection 설정
      userName: true,
      likeCount: true,
      likes: {
        '$elemMatch': { '$eq': userName }
      }
    });
  } catch (e) {
    ctx.throw(500, e);
  }

  if(!post) {
    ctx.status = 404; // Not found
    return;
  }

  if(post.userName === userName) {
    ctx.status = 406; // Not Acceptable
    return;
  };
  
  // 이미 좋아요를 한 경우에는 기존 값 반환한다.

  if(post.likes[0] === userName) { // 존재하는 정보 그대로 보여준다.
    ctx.body = {
      likesCounter: post.likesCount,
      username: userName
    };
    return;
  }

  try {
    post = await HuremPost.like({ // userName을 likes에 집어 넣고, likesCounter 를 1 올려준다.
      _id: postId,
      userName: userName
    });
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = {
    username: userName,
    likesCount: parseInt(post.likesCount)
  };
};

exports.unlike = async (ctx) => {
  const { user } = ctx.request;
  
  if(!user) {
    ctx.status = 403; // forbidden;
    return;
  }

  // 포스트 정보 찾기 
  const { postId } = ctx.params;
  const { userName } = user.profile;
  let post;
  try {
    post = await HuremPost.findById(postId, { 
      userName: true, 
      likesCount: true,
      likes: {
        '$elemMatch': {
          '$eq': userName // likes 안에서 userName과 일치하는 값만 가져온다.
        }
      }
    });
  } catch (e) {
    ctx.throw(500, e);
  }

  if(!post) {
    ctx.status = 404; // Not found
    return;
  }

  if(post.userName === userName) {
    ctx.status = 406; // Not Acceptable
    return;
  }

  // 이미 좋지 않아요를 한 경우 기본값을 반환
  if(post.likes.length === 0) {
    ctx.body = {
      username: userName,
      likeCount: post.likesCount
    };
    return;
  }

  try {
    post = await HuremPost.unlike({
      _id: postId,
      userName: userName
    });
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = {
    username: userName,
    likesCount: parseInt(post.likesCount)
  };
};