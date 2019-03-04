import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  padding-top: 55px;
  width: 100%;
  min-height: calc(100vh - 135px);
`;

const VoucherWrapper = ({ children }) => {
  return(
    <Wrapper>
      {children}
    </Wrapper>
  );
};

export default VoucherWrapper;