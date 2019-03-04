import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import * as huremWriteAction from 'store/modules/hurem/huremWriteModule';

import { 
  HuremWriteBox,
  HuremWritePost
} from 'components/hurem/HuremWrite';

class HuremWriteContainer extends Component {

  handleChange = (e) => {
    const { HuremWriteAction } = this.props;
    const { value } = e.target;
    HuremWriteAction.changeWritePostInput(value);
  }


  handlePost = async () => {
    this.input.blur();

    setTimeout(
      () => {
        this.input.focus();
      }, 100
    );

    // the method is excuted if Full progressbar 
    const { HuremWriteAction, value } = this.props;

    const message = (message) => {
      return <div style={{ fontSize: '1rem' }}>{message}</div>;
    };

    if(value.length < 5) {
      HuremWriteAction.changeWritePostInput('');
      return toast(message('너무 짧습니다, 5자 이상 입력해주세요!'), { type: 'error' });
    }

    if(value.length > 1000) {
      HuremWriteAction.changeWritePostInput('');
      return toast(message('최대 1000자까지 입력 할 수 있습니다.'), { type: 'error' });
    }

    try{
      await HuremWriteAction.writePost(value);
      toast(message('생각이 작성되었습니다.'), { type: 'success' });
    } catch (e) {
      if(e.response.status === 403) {
        return toast(message('로그인해주세요!'), { type: 'error' });
      };
      toast(message('오류가 발생했습니다.'), { type: 'error' });
    }
  }

  render() {
    const { handleChange, handlePost } = this;
    const { value } = this.props;
    return (
      <HuremWriteBox>
        <HuremWritePost value ={value} handleChange={handleChange} handlePost={handlePost} inputRef={(ref) => this.input = ref}>
          
        </HuremWritePost>
      </HuremWriteBox>
    );
  };
}

export default connect(
  (state) => ({
    value: state.huremWriteModule.getIn(['writePost', 'value'])
  }),
  (dispatch) => ({
    HuremWriteAction: bindActionCreators(huremWriteAction, dispatch)
  })
)(HuremWriteContainer);