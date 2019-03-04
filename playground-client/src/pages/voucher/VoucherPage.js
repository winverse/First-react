import React, { Fragment } from 'react';

import HeaderContainer from 'containers/common/HeaderContainer';
import VoucherContainer from 'containers/voucher/VoucherContainer';
import Footer from 'components/common/Footer';
import VoucherModalContainer from 'containers/voucher/VoucherModalContainer';

const VoucherPage = () => (
  <Fragment>
    <HeaderContainer page='marketPost'/>
    <VoucherContainer/>
    <Footer/>
    <VoucherModalContainer/>
  </Fragment>
);

export default VoucherPage;   