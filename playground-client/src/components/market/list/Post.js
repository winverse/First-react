import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import moment from 'moment';
import { Link } from 'react-router-dom';
import HeartIcon from 'react-icons/lib/io/heart';
import EyeIcon from 'react-icons/lib/go/eye';

import { shadow, media } from 'styles/styleUtils';

const Wrapper = styled.div`
  width: calc((100% - 48px) / 4);
  border-radius: 10px;
  margin-bottom: 2rem;
  ${shadow(0)};

  &:hover{
    transition: all 0.5s ease;
    ${shadow(2)};
  }

  ${media.desktop`
    width: calc((100% - 32px) / 2);
  `}
  ${media.phone`
    width: 100%;
  `}
`;

const PostHead = styled.div`
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${oc.gray[2]};
`;

// 유저네임을 띄워줍니다
const Username = styled.div`
    font-weight: 600;
    color: ${oc.gray[8]};
    margin-left: 0.3rem;
    font-size: 0.8rem;
    cursor: pointer;
`;

// 얼마나 전에 작성됐는지 알려줍니다
const Time = styled.div`
    color: ${oc.gray[6]};
    font-size: 0.9rem;
    margin-left: auto;
`;

const Content = styled(Link)`
    display: flex;
    justify-content: center;
    padding: 1rem;
    border-bottom: 1px solid ${oc.gray[2]};
    overflow: hidden;
`;

const Thumbnail = styled.img`
  cursor: pointer;
  margin: 0 auto;
  max-width: 100%;
  min-width: 100%;
  max-height: 45vh;
  &:hover{
    transform: scale(1.2);
    transition: all 0.5s ease;
  }
`;

const SubBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const EyeBox = styled.div`
  margin-left: 2rem;
  font-weight: 600;
  color: ${oc.gray[6]};
  font-size: 0.9rem;
  svg{
    margin-right: 0.5rem;
    font-size: 1.5rem;
  }
`;

const HeartBox = styled.div`
  margin-right: 2rem;
  font-weight: 600;
  color: ${oc.gray[6]};
  font-size: 0.9rem;
  svg{
    margin-right: 0.5rem;
    font-size: 1.5rem;
  }
`;

const Post = ({ post }) => {
  const { author, thumbnail, createAt, likesCount, viewing, _id } = post;
  return(
    <Wrapper>
      <PostHead>
        <Username>{author}</Username>
        <Time>{moment(createAt).fromNow()}</Time>
      </PostHead>
      <Content to={`/market/post/${_id}`}>
        <Thumbnail src={thumbnail ? thumbnail : null}/>
      </Content>
      <SubBox>
        <EyeBox><EyeIcon/>{viewing === isNaN ? 0 : viewing}</EyeBox>
        <HeartBox><HeartIcon/>{likesCount === isNaN ? 0 : likesCount}</HeartBox>
      </SubBox>
    </Wrapper>
  );
};

export default Post;