import React, { Fragment } from 'react';
import HeaderContainer from 'containers/common/HeaderContainer';
import MarketEditorContainer from 'containers/market/editor/MarketEditorContainer';
import Footer from 'components/common/Footer';

const MarketEditorPage = () => (
  <Fragment>
    <HeaderContainer page='MarketEditor'/>
    <MarketEditorContainer/>
    <Footer/>
  </Fragment>
);

export default MarketEditorPage;  