import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import Textarea from 'react-textarea-autosize';

import { shadow, media } from 'styles/styleUtils';
import ProgressBar from './ProgressBar';

const Wrapper = styled.div`
  position: relative;
  width: 40%;
  border-radius: 5px;
  background: ${oc.gray[7]};
  padding: 0.5rem 1rem;
  ${shadow(1)};

  ${media.wide`
    width: 80%;
  `};

  ${media.phone`
      width: calc(100% - 1rem);
  `};
`;

const StyledTextarea = styled(Textarea)`
  width: 100%;
  background: transparent;
  border: none;
  resize: none;
  outline: none;
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
  letter-spacing: -1px;
  
  &::placeholder {
    text-align: center;
    color: ${oc.gray[3]};
    letter-spacing: -1px;
    font-weight: 600;
    padding:0.25rem;
    padding-top: 0.8rem;
    color: white;
    ${media.tablet`
      font-size: 1.2rem;
    `};
  }

  ${media.tablet`
    width: 100%;
  `}
`;

const HuremWritePost = ({ handleChange, handlePost, value, inputRef }) => (
  <Wrapper>
    <StyledTextarea onPaste={ e => e.preventDefault()} value={value} onChange={handleChange} minRows={2} maxRows={10} placeholder={`의식의 흐름대로 적어보세요!`} inputRef={inputRef}/>
    <ProgressBar onPost={handlePost} value={value}/>
  </Wrapper>
);

export default HuremWritePost;