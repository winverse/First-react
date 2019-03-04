import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { shadow } from 'styles/styleUtils';
import withRelayout from 'lib/withRelayout';

const Wrapper = styled.div`
  display: flex;
  width: calc(100% - 4rem);
  margin: 0 auto;
  height: 2rem;
`;

const Thumbnail = styled.img`
  border-radius: 50%;
  width: 2rem;
  ${shadow(0)}
`;

const CommentBox = styled.div`
  background: white;
  border-radius: 10px;
  display: flex;
  margin-left: auto;
  width: 95%;
  height: 100%;
`;

const Input = styled.input`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 10px;
  ${shadow(0)}
`;

const CommentInput = ({ thubmnail, value, onChange, onKeyPress }) => {
  return(
    <Wrapper>
      <Thumbnail src={thubmnail}/>
      <CommentBox>
        <Input 
          placeholder='내용을 입력해주세요!' 
          onChange={onChange} 
          value={value}
          onKeyPress={onKeyPress}
        />
      </CommentBox>
    </Wrapper>
  );
};

export default withRelayout(CommentInput);