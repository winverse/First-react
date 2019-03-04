import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'styles/styleUtils';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

const Wrapper = styled.div`
  width: 900px;
  min-height: 3rem;
  margin: 0 auto 1.5rem;
  background: ${oc.gray[1]};
  padding-top: 1rem;
  ${props => props.recomment === true ? `` : `${shadow(0)};`}
`;

const CommentWrapper = ({ children, recomment }) => {
  return(
    <Wrapper recomment={recomment}>
      {children}
    </Wrapper>
  );
};

export default CommentWrapper;