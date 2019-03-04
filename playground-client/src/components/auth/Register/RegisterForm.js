import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

import { media } from 'styles/styleUtils';

const Wrapper = styled.div`
  width: calc(100% - 2rem);
  margin: 1rem auto;
  height: calc((100% - 70px) - 2rem);
`;

const Title = styled.h1`
  color: ${oc.gray[8]};
  padding-bottom: 0.25rem;
  font-size: 1.25rem;
  letter-spacing: -1px;
`;

const LoginSection = styled.div`
  margin-top: 0.7rem;
  display: flex;
  justify-content: space-between;
  color: ${oc.gray[6]};
  font-size: 0.9rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
`;

const LoginText = styled.span`
`;

const LoginButton = styled(Link)`
  color: ${oc.gray[6]};
  font-size: 0.8rem;
  user-select: none;
  border-bottom: 1px solid ${oc.gray[5]};
`;

const RegisterForm = ({ children }) => (
  <Wrapper>
    <Title>회원가입하기</Title>
    {children}
    <LoginSection>
      <LoginText>
        이미 회원가입하셨나요?
      </LoginText>
      <LoginButton to="/auth/login">
        로그인하기
      </LoginButton>
    </LoginSection>
  </Wrapper>
);

export default RegisterForm;