import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  height: 50px;
  background: ${oc.indigo[7]};
  cursor: pointer;
  user-select: none;
  &:hover{
    filter: brightness(120%);
  }
`;

const Text = styled.div`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -2px;
`;

const RegisterButton = ({ handleRegister }) => (
  <Wrapper onClick={handleRegister}>
    <Text>
      회원가입
    </Text>
  </Wrapper>
);

export default RegisterButton;