import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as baseActions from 'store/modules/base/baseModule';
import * as marketPostActions from 'store/modules/market/marketPostModule';
import * as marketEditorActions from 'store/modules/market/marketEditorModule';

import AskRemoveModalContainer from 'containers/base/AskRemoveModalContainer';
import {
  PostWrapper,
  PostInfo,
  PostBody
} from 'components/market/post';

class MarketPostContainer extends Component {

  message = (message) => {
    return <div style={{ fontSize: '1.25rem' }}>{message}</div>;
  }

  handleGetPost = async (id) => {
    const { message } = this;
    const { MarketPostActions, history } = this.props;
    try {
      await MarketPostActions.getPost(id);
    } catch (e) {
      console.log(e);
    }
  }

  handleEditor = async () => {
    const { MarketEditorActions, data, history }= this.props;
    const { title, content, _id, price } = data.toJS();
    
    try {
      await MarketEditorActions.editPostClick({ title, content, price });
      history.push(`/market/editor/${_id}`);
    } catch (e) {
      console.log(e);
    }
  }

  handleRemove = async () => {
    const { BaseActions } = this.props;
    BaseActions.showModal('remove');
  }

  componentDidMount() {
    const { message, handleGetPost } = this; 
    const { match, history, MarketPostActions, postId } = this.props;
    const { id } = match.params;

    if(!id) {
      toast(message('잘못된 접근입니다.'), { type: 'error' });
      history.push('/market');
      return;
    }
    handleGetPost(id);

  }

  componentDidUpdate(prevProps, prevState) {
    const { match, history } = this.props;
    if(prevProps.postId !== this.props.postId) {
      const { id } = match.params;
      const { message } = this;
      if(id !== this.props.postId) {
        toast(message('잘못된 접근입니다.'), { type: 'error' });
        history.push('/market');
        return;
      }
    }
  }

  componentWillUnmount() {
    const { MarketPostActions } = this.props;
    MarketPostActions.initializeform();
  }

  render() { 
    const { handleEditor, handleRemove } = this;
    const { data, loggedUsername } = this.props;
    const { author, title, createAt, viewing, likesCount, content, price } = data.toJS();
    return (
      <PostWrapper>
        <PostInfo 
          author={author}
          title={title}
          createAt={createAt}
          viewing={viewing}
          price={price}
          likesCount={likesCount}
          onEdit={handleEditor}
          loggedUsername={loggedUsername}
          onRemove={handleRemove}
        />
        <PostBody           
          content={content}
        />
        <AskRemoveModalContainer
          page='market'
        />
      </PostWrapper>
    );
  };
}

export default connect(
  (state) => ({
    data: state.marketPostModule.get('data'),
    loggedUsername: state.userModule.getIn(['loggedInfo', 'userName'])
  }),
  (dispatch) => ({
    MarketPostActions: bindActionCreators(marketPostActions, dispatch),
    MarketEditorActions: bindActionCreators(marketEditorActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(MarketPostContainer));