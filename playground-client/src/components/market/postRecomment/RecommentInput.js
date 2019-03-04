import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import moment from 'moment';

import { shadow } from 'styles/styleUtils';
import CommentWriteInput from './RecommentWriteInput';

import ReCommentContainer from 'containers/market/post/MarketReCommentContainer';

const Wrapper = styled.div`
  display: flex;
  width: calc(100% - 4rem);
  height: auto;
  margin: 0 auto;
  flex-flow: row wrap;
  & + & {
    margin-top: 0.5rem;
  }
`;

const Mainbox = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
`;

const Thumbnail = styled.img`
  border-radius: 50%;
  width: 2rem;
  ${shadow(0)}
`;

const CommentBox = styled.div`
  background: white;
  border-radius: 10px;
  display: flex;
  margin-left: 1rem;
  height: 100%;
  user-select: none;
  width: auto;
`;

const Text = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  border: none;
  outline: none;
  border-radius: 10px;
  ${shadow(0)}
  font-size: 0.9rem;
  line-height: 2rem;
`;

const Username = styled.div`
  display: inline-block;
  color: ${oc.indigo[7]};
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

const SubBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  box-sizing: border-box;
  height: 1.5rem;
  width: 100%;
  margin-left: 3rem;
  align-items: center;
`;

const Date = styled.span`
  font-size: 0.7rem;
  color: ${oc.gray[6]};
`;

const CommentAdd = styled.span`
  font-size: 0.7rem;
  color: ${oc.violet[6]};
  margin-left: 0.5rem;
  border-bottom: 1px solid ${oc.violet[7]};
  cursor: pointer;
`;

const CommentInput = ({ thubmnail, value, author, message, createAt, comment, _id }) => {
  
  return(
    <Wrapper>
      <Mainbox>
        <Thumbnail src='https://s3.ap-northeast-2.amazonaws.com/s3.images.doren.com/marketImages/20180423-ly5do-default-.thumbnail-.png'/>
        <CommentBox>
          <Text><Username>{author}</Username>{message}</Text>
        </CommentBox>
      </Mainbox>
      <SubBox>
        <Date>{moment(createAt).fromNow()}</Date>
      </SubBox>
    </Wrapper>
  );
};

export default CommentInput;