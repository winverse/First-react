import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import CommentBlock from 'components/hurem/HuremPostList/CommentBlock';
import CommentList from 'components/hurem/HuremPostList/CommentList';

import * as huremListActions  from 'store/modules/hurem/huremListModule';

class HuremCommentContainer extends Component {

  handleChange = (e) => {
    const { value } = e.target;
    const { HuremListActions, post } = this.props;

    HuremListActions.changeCommentInput({
      postId: post.get('_id'),
      value
    });
  }

  handleKeyPress = (e) => {
    const { key } = e.target;
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.comment();
    }
  }

  comment = () => {
    const { HuremListActions, post, status } = this.props;
    const value = status.get('value');

    const message = (message) => (<div style={{ fontSize: '1.1rem' }}>{message}</div>);


    if(value === '') {
      return toast(message('덧글을 입력해주세요'), { type: 'error' });
    }

    HuremListActions.comment({
      postId: post.get('_id'),
      text: value
    });
  }

  render() {
    const { status, post } = this.props;
    const { visible, value } = status ? status.toJS() : {}; // status 가 존재하지 않는 경우 위한 예외 케이스
    const { handleChange, handleKeyPress } = this;

    if(!visible) return null;

    return (
      <CommentBlock 
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        comments={post.get('comment')}
        CommentList={CommentList}
      />
    );
  };
}

export default connect(
  (state, ownProps) => ({
    status: state.huremListModule.getIn(['comments', ownProps.post.get('_id')])
  }),
  (dispatch) => ({
    HuremListActions: bindActionCreators(huremListActions, dispatch)
  })
)(HuremCommentContainer);