import React, { Fragment } from 'react';

import HeaderContianer from 'containers/common/HeaderContainer';
import ListContainer from 'containers/market/list/MarketListContainer';
import Footer from 'components/common/Footer';

const MarketListPage = () => (
  <Fragment>
    <HeaderContianer page='Market'/>
    <ListContainer/>
    <Footer/>
  </Fragment>
);

export default MarketListPage;