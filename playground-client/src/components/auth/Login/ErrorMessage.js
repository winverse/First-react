import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { TextShake  } from 'styles/keyFrames';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  background: ${oc.gray[3]};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 100%;
`;

const Message = styled.div`
  color: red;
  font-weight: 600;
  font-size: 0.9rem;
  animation: ${TextShake} 0.25s ease;
  animation-fill-mode: forwards;
`;


const ErrorMessage = ({ message }) => (
  <Wrapper>
    <Message>{message}</Message>
  </Wrapper>
);

export default ErrorMessage;