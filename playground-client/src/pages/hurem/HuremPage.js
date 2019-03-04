import React, { Fragment } from 'react';

import {
  HeaderContainer,
  HuremWriteContainer,
  HuremPostListContainer
} from 'containers';

import Footer from 'components/common/Footer';

const HuremPage = () => (
  <Fragment>
    <HeaderContainer/>
    <HuremWriteContainer/>
    <HuremPostListContainer/>
    <Footer/>
  </Fragment>
);

export default HuremPage;