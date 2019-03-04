import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

import * as userActions from 'store/modules/auth/userModule';
import * as marketCommentActions from 'store/modules/market/marketCommentModule';

import { 
  CommentWrapper,
  CommentWriteInput,
  CommentList
} from 'components/market/postComment';
import { presets } from 'glamor';

class MarketCommentContainer extends Component {

  message = (message) => {
    return <div style={{ fontSize: '1.1rem' }}>{message}</div>;
  }

  handleChange = (e) => {
    const { MarketCommentActions } = this.props;
    const { value } = e.target;
    MarketCommentActions.changeInput(value);

  }

  handleKeyPress = (e) => {
    const { key } = e;
    const { handleSubmitComment } = this;
    if(key === 'Enter') {
      handleSubmitComment();
    }
  }

  handleSubmitComment = async () => {
    const { MarketCommentActions, value, match } = this.props;
    const { message } = this;
    const { id } = match.params;

    if(value.length < 3) {
      toast(message('댓글은 3글자 이상 작성해주세요!'), { type: 'error' });
      return;
    }

    if(value.length > 100) {
      toast(message('댓글은 100글자 이상 작성할 수 없습니다.'), { type: 'error' });
      return;
    }

    try {
      await MarketCommentActions.submitComment({ id, value });
      toast(message('댓글이 작성되었습니다.'), { type: 'success' });
      this.componentDidMount();
    } catch (e) {
      console.log(e);
    }
  }

  handleGetComment = async () => {
    const { MarketCommentActions, match } = this.props;
    const { id } = match.params;
    try {
      await MarketCommentActions.getComments(id);
    } catch (e) {
      console.log(e);
    }
  }

  handleReCommentClick = (postId) => {
    const { MarketCommentActions } = this.props;
    MarketCommentActions.toggleRecomment(postId);
  };

  componentDidMount() {
    const { handleGetComment } = this;
    handleGetComment();
  }

  componentWillUnmount() {
    const { MarketCommentActions } = this.props;
    MarketCommentActions.initialize();
  }

  render() {
    const { handleChange, handleKeyPress, handleReCommentClick } = this;
    const { userInfo, value, comments } = this.props;
    const { thumbnail, userName } = userInfo.toJS();
    
    return (
      <CommentWrapper>
        <CommentWriteInput 
          thubmnail={thumbnail} 
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <CommentList 
          onCommentClick={handleReCommentClick}
          comments={this.props.comments.toJS()}
        />
      </CommentWrapper>
    );
  };
}

export default connect(
  (state) => ({
    userInfo: state.userModule.get('loggedInfo'),
    value: state.marketCommentModule.get('comment'),
    comments: state.marketCommentModule.get('comments')
  }),
  (dispatch) => ({
    MarketCommentActions: bindActionCreators(marketCommentActions, dispatch)
  })
)(withRouter(MarketCommentContainer));