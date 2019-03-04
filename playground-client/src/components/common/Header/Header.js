import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'styles/styleUtils';

const Positioner = styled.div`
  position: relative;
  display: flex;
  flex-flow: column wrap;
  background: ${oc.indigo[7]};
  height: 55px;
  width: 100%;
  ${props => props.page === 'marketPost' ? `` : `${shadow(1)}` }
  
  position: fixed;
  z-index: 9;
`;

const Header = ({ children, page }) => (
  <Positioner page={page}>
    {children}
  </Positioner>
);

export default Header;    