import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import moment from 'moment';
import 'moment/locale/ko';

import { shadow, media } from 'styles/styleUtils';
import PostFooter from './PostFooter';
import CommentBlockContainer from 'containers/hurem/HuremCommentContainer';

const Wrapper = styled.span`
  width: calc((100% - 32px) / 3);
  border-radius: 10px;
  margin-bottom: 2rem;
  ${shadow(0)};

  ${media.desktop`
    width: calc((100% - 16px) / 2);
  `}
  ${media.phone`
    width: 100%;
  `}
`;

const PostHead = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${oc.gray[2]};
`;

const UserThumbnail = styled.img`
    background: ${oc.gray[2]};
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 32px;
    height: 32px;
    border-radius: 50%;
`;

// 유저네임을 띄워줍니다
const Username = styled.div`
    font-weight: 500;
    margin-left: 0.3rem;
    font-size: 0.9rem;
`;

// 몇번째 생각인지 알려줍니다
const Count = styled.div`
    color: ${oc.gray[6]};
    margin-left: 1rem;
    font-size: 0.8rem;
`;

// 얼마나 전에 작성됐는지 알려줍니다
const Time = styled.div`
    color: ${oc.gray[6]};
    font-size: 0.9rem;
    margin-left: auto;
`;

// 포스트 내용을 보여줍니다
const Content = styled.div`
    font-size: 1.25rem;
    color: ${oc.gray[8]};
    font-weight:300;
    padding: 1rem;
    word-break: break-all;
    white-space: pre-wrap;
`;

const Post = ({ post, onToggleLike, loginUserName, arrayCheck, handleCheckLike, onCommentClick, thumbnail }) => {
  const {
    _id,
    count,
    userName,
    content, 
    comment,
    likesCount,
    likes,
    like,
    createAt
  } = post.toJS();
  
  const toggleLike = () => onToggleLike({
    postId: _id,
    postUserName: userName,
    likes
  });

  const checkLike = () => handleCheckLike({ postId:_id, likes });

  const commentClick = () => onCommentClick(_id);

  return(
    <Wrapper>
      <PostHead>
        <UserThumbnail src={thumbnail}/>
        <Username>{userName}</Username>
        <Count>#{count}번째 생각</Count>
        <Time>{moment(createAt).fromNow()}</Time>
      </PostHead>
      <Content>
        {content}
      </Content>
      <PostFooter
        likesCount={likesCount}
        onToggleLike={toggleLike}
        loginUserName={loginUserName}
        postUserName={userName}
        checkLike={checkLike}
        onCommentClick={commentClick}
        check={like}
        comments={comment}
      />
      <CommentBlockContainer post={post}/>
    </Wrapper>
  );
};

export default Post;