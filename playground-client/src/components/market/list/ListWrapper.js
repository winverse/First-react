import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  padding-top: 65px;
  min-height: 84.6vh;
`;

const ListWrapper = ({ children }) => {
  return(
    <Wrapper>
      {children}
    </Wrapper>
  );
};

export default ListWrapper;