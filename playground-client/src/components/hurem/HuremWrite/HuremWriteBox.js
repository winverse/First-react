import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { media } from 'styles/styleUtils';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  max-width: 100%;
  height: 100px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  ${media.phone`
    padding-top: 50px;
  `}
`;

const HuremWrite = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default HuremWrite;