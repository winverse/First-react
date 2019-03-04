import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'styles/styleUtils';

const Wrapper = styled.div`
  width: 1024px;
  min-height: 3rem;
  margin: 0 auto 1.5rem;
  background: ${oc.gray[1]};
  padding-top: 1rem;
  ${shadow(0)}
`;

const CommentWrapper = ({ children, recomment }) => {
  return(
    <Wrapper recomment={recomment}>
      {children}
    </Wrapper>
  );
};

export default CommentWrapper;