import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import * as voucherActions from 'store/modules/voucher/voucherModule';
import * as baseActions from 'store/modules/base/baseModule';
import { loadScript } from 'lib/loadScript';

import { 
  VoucherWrapper,
  VoucherInfo,
  VoucherBody
} from 'components/voucher';

class VoucherContainer extends Component {

  toastId = null;

  message = (message) => {
    if (this.toastId === null) {
      this.toastId = 'once'; 
      return <div style={{ fontSize: '1.1rem' }}>{message}</div>;
    }
    return false;
  }

  handleInputChange = (e) => {

    const { value } = e.target;
    const { VoucherActions } = this.props;
    const { message } = this;

    const valuePatten = /^[0-9,]*$/;

    if(!valuePatten.test(value)){ 
      toast(message('숫자만 입력가능합니다!'), { type: 'error' });
      return;
    }

    function comma(str) { 
      str = String(str); 
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'); 
    }

    const parsedValue = comma(value);
    VoucherActions.inputAmountChange(parsedValue);
  }

  handleModal = () => {
    const { message } = this;
    const { BaseActions, value } = this.props;
    if(!value) {
      return toast(message('금액을 입력해주세요!'), { type: 'error' });
    }
    const IMP = window.IMP;
    IMP.init('imp32175055');
    BaseActions.showVoucherModal('voucher');
  }

  componentDidMount() {
    loadScript('http://code.jquery.com/jquery-3.3.1.min.js');
    loadScript('https://service.iamport.kr/js/iamport.payment-1.1.5.js');
  }

  componentWillUnmount() {
    const { VoucherActions } = this.props;
    VoucherActions.initialize();
  }
  render() {
    const { value } = this.props;
    const { handleInputChange, handleModal } = this;
    return (
      <VoucherWrapper>
        <VoucherInfo/>
        <VoucherBody
          onModal={handleModal}
          value={value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')} 
          onInputChange={handleInputChange}
        />
      </VoucherWrapper>
    );
  };
}

export default connect(
  (state) => ({
    value: state.voucherModule.get('amount')
  }),
  (dispatch) => ({
    VoucherActions: bindActionCreators(voucherActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(VoucherContainer);