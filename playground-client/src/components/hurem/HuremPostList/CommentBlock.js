import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  background: ${oc.gray[0]};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const InputWrapper = styled.div`
  padding: 0.75rem;
`;

const Input = styled.input`
  display: block;
  background: none;
  outline: none;
  border: none;
  font-size: 0.8rem;
  width: 100%;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid ${oc.gray[5]};

  &:focus {
      border-bottom: 1px solid ${oc.blue[4]};
  }

  &::placeholder {
    text-align: center;
    color: ${oc.gray[5]};
  }
`;

const CommentBlock = ({ onChange, onKeyPress, value, comments, CommentList }) => (
  <Wrapper>
    <InputWrapper>
      <Input
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="덧글을 입력 후 [Enter] 를 눌러 작성하세요"/>
      <CommentList comments={comments}/>
    </InputWrapper>
  </Wrapper>
);

export default CommentBlock;