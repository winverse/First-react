import React, { Fragment } from 'react';
import HeaderContainer from 'containers/common/HeaderContainer';
import MarketPostContainer from 'containers/market/post/MarketPostContainer';
import MarketCommentContainer from 'containers/market/post/MarketCommentContainer';
import Footer from 'components/common/Footer';

const MarketPostPage = () => (
  <Fragment>
    <HeaderContainer page='marketPost'/>
    <MarketPostContainer/>
    <MarketCommentContainer/>
    <Footer/>
  </Fragment>
);

export default MarketPostPage;