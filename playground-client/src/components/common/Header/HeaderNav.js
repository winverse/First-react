import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { media } from 'styles/styleUtils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
  a{
    font-size: 1.1rem;
    color: white;
    font-weight: 600;
    font-family: 'Nanum Gothic Coding', monospace;
    letter-spacing: -1px;
    
    &:hover{
      color: ${oc.blue[0]};
      font-size: 1.35rem;
      transition: all 0.25s ease;
      
    }
    & + a {
      margin-left: 13px;
    }
  }
  ${media.phone`
    display: none;
  `}
`;

const HeaderNav = () => (
  <Wrapper>
    <Link to="/hurem">흐름</Link>
    <Link to="/bulletin">게시판</Link>
    <Link to="/market">옷걸이</Link>
    <Link to="/voucher">이용권 구매</Link>
  </Wrapper>
);

export default HeaderNav;