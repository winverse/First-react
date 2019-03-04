import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

import * as userActions from 'store/modules/auth/userModule';
import * as marketCommentActions from 'store/modules/market/marketCommentModule';

import RecommentWrapper from 'components/market/postRecomment/RecommentWrapper';
import RecommentWriteInput from 'components/market/postRecomment/RecommentWriteInput';
import RecommentList from 'components/market/postRecomment/RecommentList';
import { comment } from 'lib/api/hurem/huremAPI';

class MarketCommentContainer extends Component {

  message = (message) => {
    return <div style={{ fontSize: '1.1rem' }}>{message}</div>;
  }

  handleChange = (e) => {
    const { value } = e.target;
    const { MarketCommentActions, commentArray, id } = this.props;
    
    const index = commentArray.toJS().findIndex((post) => post._id === id);
    const postId = commentArray.toJS()[index]._id;
    MarketCommentActions.changeRecommentInput({
      postId,
      value
    });
  }

  handleKeyPress = (e) => { // stage값도 전송하기
    if(e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleSubmit = async () => {

    const { message } = this;
    const { MarketCommentActions ,status, commentArray, id, match } = this.props;
    const { id: postId } = match.params;
    const { value } = status ? status.toJS() : {};
    const index = commentArray.toJS().findIndex((post) => post._id === id);
    const commentId = commentArray.toJS()[index]._id;

    if(value.length < 1) {
      return  toast(message('댓글은 두 글자 이상 적어주세요'), { type: 'error' });
    }
    try {
      await MarketCommentActions.submitRecomment({
        value,
        commentId,
        postId
      });
      toast(message('댓글이 성공적으로 달렸습니다　:) '), { type: 'success' });
    } catch (e) {
      console.log(`전송`, e);
    }
  }

  render() {
    const { handleChange, handleKeyPress } = this;
    const { status, commentArray, id, thumbnail } = this.props;
    const { visible, value } = status ? status.toJS() : {};
    const index = commentArray.toJS().findIndex((post) => post._id === id);
    const comments = commentArray.toJS()[index].comments;
    
    if(!visible) return null;

    return (
      <RecommentWrapper recomment={true}>
        <RecommentWriteInput
          thumbnail={thumbnail}
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <RecommentList
          comments={comments}
        />
      </RecommentWrapper>
    );
  };
}

export default connect(
  (state, ownProps) => ({
    thumbnail: state.userModule.getIn(['loggedInfo', 'thumbnail']),
    status: state.marketCommentModule.getIn(['reComment', ownProps.id]),
    commentArray: state.marketCommentModule.get('comments')
  }),
  (dispatch) => ({
    MarketCommentActions: bindActionCreators(marketCommentActions, dispatch)
  })
)(withRouter(MarketCommentContainer));