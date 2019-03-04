import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import HeartIcon from 'react-icons/lib/go/heart';
import CommentIcon from 'react-icons/lib/io/chatbubble';

const Wrapper = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${oc.gray[1]};
  display: flex;
  color: ${oc.gray[5]};
  svg {
    font-size: 1.75rem;
    cursor: pointer;
  }
  span {
    margin-left: 0.25rem;
    font-size: 0.8rem;
    padding-bottom: 0.25rem;
  }
`;

const Likes = styled.div`
    display: flex;
    align-items: center;
    
    svg {
        &:hover {
            color: ${oc.gray[6]};
        }
        &:active {
            color: ${oc.pink[6]};
        }
    }
    ${props => props.active && `
        svg {
            color: ${oc.blue[6]};
            &:hover {
                color: ${oc.blue[5]};
            }
        }
    `}
`;

const Comments = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    svg {
        &:hover {
            color: ${oc.blue[6]};
        }
        &:active {
            color: ${oc.cyan[6]};
        }
    }
`;

const SvgSpan = styled.span`
    svg {
        color: ${oc.blue[6]};
        &:hover {
            color: ${oc.blue[5]};
        }
    }
`;
const Span = styled.div`
    display: inline-block;
    margin-left: 2px;
`;

class PostFooter extends Component {

  componentWillMount(){
    this.props.checkLike();
  }
  render() {
    const { likesCount=0, comments=[], onToggleLike, onCommentClick, loginUserName, postUserName, check, checkLike } = this.props;
    return (
      <Wrapper>
        <Likes active={check}>
          <HeartIcon onClick={onToggleLike}/>
          <SvgSpan>좋아요 <Span>{isNaN(likesCount) ? `` : `${likesCount}`}개</Span></SvgSpan>
        </Likes>
        <Comments>
          <CommentIcon onClick={onCommentClick}/>
          <SvgSpan>덧글 {comments.length}개</SvgSpan>
        </Comments>
      </Wrapper>
    );
  }
}


export default PostFooter;