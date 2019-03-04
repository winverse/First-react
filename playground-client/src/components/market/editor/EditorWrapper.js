import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  width: 100%;
  padding-top: 55px;
  min-height: 84.8vh;
`;

const EditorWrapper = ({ children }) => {
  return(
    <Wrapper>
      {children}
    </Wrapper>
  );
};

export default EditorWrapper;