import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'styles/styleUtils';

const Wrapper = styled.div`
  display: flex;
  height: 40px;
  background: white;
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  height: 40px;
  background: white;
  outline: none;
  border: none;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 1.25rem;
  ${shadow(0)};
`;

const EditorHeader = ({ onTitleChange, value }) => {
  return(
    <Wrapper>
      <Input placeholder='제목을 입력해주세요' onChange={onTitleChange} value={value}/>
    </Wrapper>
  );
};

export default EditorHeader;