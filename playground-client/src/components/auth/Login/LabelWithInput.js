import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import ErrorMessage from './ErrorMessage';

const Wrapper = styled.div`
  width: 100%;

  & + & {
    margin-top: 1rem;
  }
`;

const Label = styled.label`
  display: flex;
  width: 100%;
  color: ${oc.gray[6]};
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  letter-spacing: -1px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid ${oc.gray[4]};
`;

const Input = styled.input`
  width: 80%;
  height: 90%;
  border: none;
  outline: none;
  font-size: 1.25rem;
  margin-left: 0.5rem;
  &::placeholder{
    font-size: 1rem;
    color: ${oc.gray[5]};
  }
`;

const LabelWidthInput = ({ label, placeholder, ...rest, error }) => (
  <Wrapper>
    <Label>{label}</Label>
    <InputBox>
      <Input placeholder={placeholder} {...rest}></Input>
    </InputBox>
    {
      error !== '' && error !== undefined ? <ErrorMessage message={error}/>  : ''
    }
  </Wrapper>
);

export default LabelWidthInput;