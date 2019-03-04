import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import { importPayment } from 'lib/import/importPayment';

import VoucherModal from 'components/modal/VoucherModal/VocherAskPayment';

import * as baseActions from 'store/modules/base/baseModule';
import * as voucherActions from 'store/modules/voucher/voucherModule';

class VoucherModalContainer extends Component {

  message = (message) => {
    return <div style={{ fontSize: '1.1rem' }}>{message}</div>;
  }

  handleCancel = () => {
    const { message } = this;
    const { BaseActions, VoucherActions } = this.props;
    VoucherActions.initialize();
    BaseActions.hideVoucherModal('voucher');
    toast(message('결제를 취소하셨습니다'), { type: 'info' });
    
  }

  handleMethod = (e) => {
    const { VoucherActions } = this.props;
    const method = e.target.getAttribute('method');
    VoucherActions.methodSet(method);
  }

  handleNext = () => {
    const { VoucherActions, method, amount } = this.props;
    importPayment({ method, amount });
  }

  componentDidMount() {
  
  }

  render() {
    const { visible, amount, method } = this.props;
    const { handleCancel, handleNext, handleMethod } = this;
    return (
      <VoucherModal
        visible={visible}
        onCancel={handleCancel}
        onNext={handleNext}
        amount={amount}
        checked={method}
        onMethod={handleMethod}
      />
    );
  };
}

export default connect(
  (state) => ({
    visible: state.baseModule.getIn(['modal', 'voucher']),
    amount: state.voucherModule.get('amount'),
    method: state.voucherModule.get('method')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    VoucherActions: bindActionCreators(voucherActions, dispatch)
  })
)(VoucherModalContainer);