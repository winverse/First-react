import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import Comment from './RecommentInput';

const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-flow: row wrap;
  padding-bottom: 1rem;
  height: auto;
`;

const Null = styled.div`
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  color: ${oc.gray[5]};
`;

const CommentList = ({ comments, onCommentClick }) => {

  if(comments.length === 0) { 
    return <Null>댓글을 입력해주세요!</Null>;
  };

  const commentSize = comments ? comments.size : 0;
  const commentList = !comments ? null : comments.map(
    (reply) => {
      return <Comment {...reply} key={reply._id ? reply._id : commentSize} onCommentClick={onCommentClick}/>;
    }
  );

  return(
    <Wrapper>
      {commentList}
    </Wrapper>
  );
};

export default CommentList;