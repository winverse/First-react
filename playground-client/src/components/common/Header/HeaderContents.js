import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

import { media } from 'styles/styleUtils';

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	width: 1200px;
	height: 100%;
	padding-left: 1rem;
	padding-right: 1rem;

	${media.wide`
    width: 992px;
  `} ${media.desktop`
    width: 768px;
  `} ${media.tablet`
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  `};
`;

const Brand = styled(Link)`
  font-family: 'Bungee Inline', cursive;
  color: white;
  font-size: 1.35rem;
  letter-spacing: -1px;
  user-select: none;

  ${media.tablet`
    margin-left: 0.5rem;
  `}

  ${media.phone`
    margin-left: 1rem;
  `}
`;

const HeaderNav = ({ children }) => (
	<Wrapper>
		<Brand to="/">Loyid</Brand>
		{children}
	</Wrapper>
);

export default HeaderNav;
