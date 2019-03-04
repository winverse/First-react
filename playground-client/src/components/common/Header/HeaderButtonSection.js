import React, { Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import Menu from 'react-icons/lib/io/android-menu';

import { media } from 'styles/styleUtils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  
  ${media.tablet`
    margin-right: 1rem;
  `}
`;

const Button = styled(Link)`
  border: 2px solid white; 
  padding: 0.35rem 0.5rem;
  color: white;
  font-size: 1.15rem;
  font-weight: 600;
  user-select: none;
  border-radius: 5px;
  cursor: pointer;
  letter-spacing: -1px;

  &:hover {
    color: ${oc.indigo[7]};
    background: ${oc.blue[0]};
  }

  & + & {
    margin-left: 13px;
  }

  ${media.phone`
    display: none;
  `}
`;

const MenuIcon = styled(Menu)`
  display: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  
  ${media.phone`
    display: block;
    margin-right: 0.5rem;
  `}
`;

const UserButtonBox = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid white; 
  padding: 0.35rem 0.5rem;
  color: white;
  font-size: 1.15rem;
  font-weight: 600;
  user-select: none;
  border-radius: 5px;
  cursor: pointer;
  letter-spacing: -1px;

  &:hover {
    color: ${oc.indigo[7]};
    background: ${oc.blue[1]};
  }

  & + & {
    margin-left: 13px;
  }

  ${media.phone`
    display: none;
  `}
`;
const ToButton = styled(Link)`
  display: flex;
  align-items: center;
  border: 2px solid white; 
  padding: 0.35rem 0.5rem;
  color: white;
  font-size: 1.15rem;
  font-weight: 600;
  user-select: none;
  border-radius: 5px;
  cursor: pointer;
  letter-spacing: -1px;
  ${props => props.arrow === 'left' ? `margin-right: 13px;` : ``}

  &:hover {
    color: ${oc.indigo[7]};
    background: ${oc.blue[1]};
  }
`;

const Thumbnail = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;

    background: ${oc.cyan[3]};

    &:hover {
        filter: brightness(105%);
    }
    margin-right: 0.5rem;
`;

const HeaderButtonSection = ({ handleClick, userName, thumbnail, logout, page, onWrite, onMarketWrite, onMarketEdit, isEdit }) => (
  <Wrapper>
    {
      userName !== null ? 
        <Fragment>
          {
            page === 'marketPost' ? <ToButton to="/market" arrow='left'>목록으로</ToButton> : <ToButton to="/" arrow='left'><Thumbnail src='https://s3.ap-northeast-2.amazonaws.com/s3.images.doren.com/marketImages/20180423-ly5do-default-.thumbnail-.png'/>{userName}</ToButton>
          }
          {
            page === 'Market' || page === 'marketPost' ? 
              <ToButton to="/market/editor" arrow='right'>글쓰기</ToButton> : 
              (page === 'MarketEditor' ? <UserButtonBox onClick={isEdit ? onMarketEdit : onMarketWrite}>{isEdit ? '수정하기':'작성하기'}</UserButtonBox> : <UserButtonBox onClick={logout}>로그아웃</UserButtonBox>)
          }
        </Fragment>
        : 
        (
          <Fragment>
            <Button to="/auth/login">로그인</Button>
            <Button to="/auth/register">회원가입</Button>
          </Fragment>
        )
    }
    <MenuIcon onClick={handleClick}/>
  </Wrapper>
);

export default HeaderButtonSection;