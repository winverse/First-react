import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as marketEditorActions from 'store/modules/market/marketEditorModule';

import {
  EditorWrapper,
  EditorBox,
  EditorHeader,
  EditorBody,
  EditorFooter
} from 'components/market/editor';

class MarketEditorContainer extends Component {

  message = (message) => {
    return <div style={{ fontSize: '1.1rem' }}>{message}</div>;
  }

  handleTextChange = (e) => {
    const { MarketEditorActions } = this.props;
    const { value } = e.target;
    MarketEditorActions.titleInputChange(value);
  }

  handleContentChange = (value) => {
    const { MarketEditorActions } = this.props;
    MarketEditorActions.contentChange(value);
  } 

  handlePriceChange = (e) => {
    let { value } = e.target;
    const { MarketEditorActions } = this.props;

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
    MarketEditorActions.priceInputChange(parsedValue);
  }

  componentDidUpdate(prevProps, prevState) {
    const { message } = this; 
    const { MarketEditorActions, username, history, match, title } = this.props;
    if(prevProps.username !== this.props.username) {
      MarketEditorActions.authorSet(username);
    }

    const { id } = match.params;

    if(id && title === '') {
      toast(message('수정 중 새로고침하시면 안됩니다!'), { type: 'error' });
      history.push(`/market/post/${id}`);
    }

    // if(!this.props.username) {
    //   alert('유저 네임이 없습니다. 허용되지 않은 접근입니다');
    //   history.push('/');
    //   return;
    // }
  }

  componentDidMount() {
    const { MarketEditorActions, username, history, match, title } = this.props;
    const { message } = this;
    if(!username) return false;
    MarketEditorActions.authorSet(username);
  }

  componentWillUnmount() {
    const { MarketEditorActions } = this.props;
    MarketEditorActions.initializeForm();
  }

  render() {
    const { handleTextChange, handleContentChange, handleWritePost, handlePriceChange } = this;
    const { title, content, price } = this.props;
    return (
      <EditorWrapper>
        <EditorBox>
          <EditorHeader
            onTitleChange={handleTextChange}   
            value={title}
          />
          <EditorBody
            onContentChange={handleContentChange}
            value={content}
          />
        </EditorBox>
        <EditorFooter
          onPriceChange={handlePriceChange}
          value={price.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')}
        />
      </EditorWrapper>
    );
  };
}

export default connect(
  (state) => ({
    author: state.marketEditorModule.get('author'),
    title: state.marketEditorModule.get('title'),
    content: state.marketEditorModule.get('content'),
    price: state.marketEditorModule.get('price'),
    username: state.userModule.getIn(['loggedInfo', 'userName'])
  }),
  (dispatch) => ({
    MarketEditorActions: bindActionCreators(marketEditorActions, dispatch)
  })
)(withRouter(MarketEditorContainer));