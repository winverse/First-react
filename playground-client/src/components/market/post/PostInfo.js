import React, { Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import moment from 'moment';

import HeartIcon from 'react-icons/lib/io/heart';
import EyeIcon from 'react-icons/lib/go/eye';

const Wrapper = styled.div`
  width: 100%;
  height: 11rem;
  padding-top: 2rem;
  background:  ${oc.indigo[7]};
  display: flex;
  justify-content: center;
`;

const InfoBody = styled.div`
  width: 1024px;
  user-select: none;
`;

const TopBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-flow: row wrap;
`;

const Title = styled.div`
  width: 86.5%;
  color: white;
  font-size: 1.5rem;
  padding-top: 20px;
  padding-left: 2rem;
  font-weight: 600;
`;

const ButtonSection = styled.div`
  width: 98px;
`;

const Button = styled.div`
  width: 100%;
  border: 2px solid white;
  height: 40%;
  color: white;
  font-size: 1.15rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    color: ${oc.indigo[7]};
    background: ${oc.blue[1]};
  }

  &:active{
    transform: translateY(2px);
  }

  & + & {
    margin-top: 10px;
  }
`;

const PostInfomation = styled.div`
  display: flex;
  padding-left: 2rem;
`;

const Viewing = styled.span`
  justify-content: center;
  line-height: 31px;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  svg{

    color: ${oc.gray[1]};
    margin-right: 0.2rem;
  }
`;

const Heart = styled.span`
  justify-content: center;
  line-height: 31px;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  svg{

    color: ${oc.gray[1]};
    margin-right: 0.2rem;
  }
`;

const MiddleBox = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-between;
`;

const Username = styled(Link)`
  padding-left: 2rem;
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
`;

const PriceBox = styled.span`
  margin-top: 0.5rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.15rem;
  color: white;
`;

const Date = styled.div`
  margin-left: auto;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
  font-style: italic;
  padding-right: 1rem;
`;

const PostInfo = ({ title, author, viewing, likesCount, createAt, onEdit, loggedUsername, onRemove, price }) => {
  
  const parsedPrice = String(price).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  return(
    <Wrapper>
      <InfoBody>
        <TopBox>
          <Title>{title}</Title>
          <ButtonSection>
            {
              loggedUsername === author ? 
                <Fragment>
                  <Button onClick={onEdit}>수정</Button>
                  <Button onClick={onRemove}>삭제</Button> 
                </Fragment>
                : 
                <Button>구매하기</Button>
            }
          </ButtonSection>
        </TopBox>
        <MiddleBox>
          <Username to='/'>{author}</Username>
          <PriceBox>{parsedPrice}원</PriceBox>
        </MiddleBox>
        <PostInfomation>
          <Viewing><EyeIcon/>{viewing === isNaN ? 0 : viewing}</Viewing>
          <Heart><HeartIcon/>{likesCount === isNaN ? 0 : likesCount}</Heart>
          <Date>{moment(createAt).format('ll')}</Date>
        </PostInfomation>
      </InfoBody>
    </Wrapper>
  );
};

export default PostInfo;