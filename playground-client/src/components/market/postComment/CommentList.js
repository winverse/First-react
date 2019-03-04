import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import Comment from './CommentInput';

const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-flow: row wrap;
  padding-bottom: 1rem;
  height: auto;
`;

const Null = styled.div`
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  color: ${oc.gray[5]};
`;

const CommentList = ({ comments, onCommentClick }) => {

  if(!comments) return false;
  
  const commentSize = comments.length;
  const commentList = comments.map(
    (reply, i) => {
      return <Comment {...reply} key={reply._id ? reply._id : i} onCommentClick={onCommentClick}/>;
    }
  );

  if(comments.length === 0) {
    return <Null>댓글을 입력해주세요!</Null>;
  }

  return(
    <Wrapper>
      {commentList}
    </Wrapper>
  );
};

export default CommentList;