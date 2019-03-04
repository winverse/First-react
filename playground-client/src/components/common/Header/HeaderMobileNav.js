import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { media, shadow } from 'styles/styleUtils';
import { bounceIn, bounceOut } from 'styles/keyFrames';

const Wrapper = styled.div`
  display: none;
  background: ${oc.violet[4]};
  width: 70%;
  margin-left: -70%;
  ${shadow(0)};

  ${media.phone`
    display: flex;
    flex-flow: column wrap;
    position: absolute;
    top: 0px;
    left: 0px;

    ${props => props.visible === true ?
    `
    animation: ${bounceIn} 0.5s ease;
    animation-fill-mode: forwards;
    ` 
    : 
    ( props.visible === false ? `
    animation: ${bounceOut} 0.5s ease;
    animation-fill-mode: forwards;
    ` : ``)}
  `}

  a{
    font-size: 1.15rem;
    color: white;
    font-weight: 600;
    font-family: 'Nanum Gothic Coding', monospace;
    letter-spacing: -1px;
    text-align: center;
    padding: 0.7rem;
    border-bottom: 2px solid white;

    &:last-child{
      border-bottom: none;
    }
    &:hover{
      filter: brightness(120%);
      transition: all 0.25s ease;
      background: ${oc.indigo[8]};
    }
  }
`;

const HeaderNav = ({ visible }) => (
  <Wrapper visible={visible}>
    <Link to="/hurem">흐름</Link>
    <Link to="/bulletin">게시판</Link>
    <Link to="/album">사진첩</Link>
    <Link to="/counsel">익명상담</Link>
    <Link to="/market">옷걸이</Link>
    <Link to="/auth/login">로그인</Link>
    <Link to="/auth/register">회원가입</Link>
  </Wrapper>
);

export default HeaderNav;