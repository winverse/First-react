import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import Icon from 'react-icons/lib/fa/github-alt';

import { Link } from 'react-router-dom';
import { shadow, media } from 'styles/styleUtils';
import { roundOut, registerModal } from 'styles/keyFrames'; 

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
`;

const LoginBox = styled.div`
  max-width: 420px;
  padding-bottom: 0.8rem;
  margin: 9rem auto 0rem;
  width: 25%;
  background: white;
  border-radius: 10px;
  animation: ${registerModal} 0.2s ease;
  animation-fill-mode: forwards;

  ${shadow(1)};
  ${media.wide`
    width: 40%;
  `}
  ${media.tablet`
    width: 60%;
    margin-top: 9rem;
  `}

  ${media.phone`
    margin-top: 7rem;
    width: calc(100% - 1rem);
  `}
`;

const Header = styled(Link)`
  width: 100%;
  background: ${oc.indigo[8]};
  height: 65px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover{
    filter: brightness(120%);
  }
`;

const BrandBox = styled.div`
  border: 0.18rem solid ${oc.blue[3]};
  border-radius: 50%;
  animation: ${roundOut} 1.3s ease-in-out;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
`;

const BrandIcon = styled(Icon)`
  color: ${oc.gray[0]};
  font-size: 2rem;
  font-weight: 600;
  opacity: 1;
`;

const Login = ({ children }) => (
  <Wrapper>
    <LoginBox>
      <Header to="/">
        <BrandBox><BrandIcon/></BrandBox>
      </Header>
      {children}
    </LoginBox>
  </Wrapper>
);

export default Login;