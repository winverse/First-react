import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  width: 50%;
  max-width: 997px;
  min-height: 80vh;
  margin: 1rem auto;
`;

const EditorBox = ({ children }) => {
  return(
    <Wrapper>
      {children}
    </Wrapper>
  );
};

export default EditorBox;