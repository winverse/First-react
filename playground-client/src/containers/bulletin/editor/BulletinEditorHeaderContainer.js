import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import EditorHeader from 'components/bulletin/editor/EditorHeader';
import storage from 'lib/storage';

import * as bulletinEditorActions from 'store/modules/bulletin/bulletinEditorModule';
import * as bulletinPostActions from 'store/modules/bulletin/bulletinPostModule';

class BulletinEditorHeaderContainer extends Component {

  componentDidMount() {
    const { BulletinEditorActions, match, history, location } = this.props;
    const { getPost } = this;
    const loggedInfo = storage.get('loggedInfo');

    BulletinEditorActions.initialize();

    if(!loggedInfo) {
      alert('로그인을 해주세요!');
      window.location.href = '/auth/login';
    }

    const { id } = match.params;

    const idPattern = /^[a-f\d]{24}$/i;
    if(!idPattern.test(id) && id !== undefined) {
      toast(this.message('허용되지 않은 접근입니다.'), { type: 'error' });
      history.push('/');
      return;
    }

    if(id) {
      getPost(id);
    }
  }

  getPost = async (id) => {
    const { BulletinPostActions } = this.props;
    try {
      await BulletinPostActions.getPost(id);
    } catch (e) {
      console.log(e);
    }
  }

  message = (message) => {
    return <div style={{ fontSize: '1rem' }}>{message}</div>;
  }

  handleGoBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  handleOnSubmit = async () => {
    const { BulletinEditorActions, author, text, title, history, match } = this.props;
    
    if(!author) {
      alert('잘못된 접근입니다.');
      window.location.href = '/auth/login?expired';
    }
    if(title.length < 3) {
      alert('제목은 3글자 이상입니다.');
      return false;
    }
    const textLength = text.toJS().value ? text.toJS().values.length : undefined;

    if(textLength < 12 && textLength !== undefined) {
      alert('내용은 4자 이상 작성해주세요');
      return false;
    }

    try {
      const { id } = match.params;
      if(id) {
        await BulletinEditorActions.editPost({ id, author, text, title });
        history.push(`/bulletin/post/${id}`);
        return;
      }
      await BulletinEditorActions.writePost({ author, text, title });
      history.push(`/bulletin/post/${this.props.postId}`);
    } catch (e) {
      if(e.response.status === 403) {
        alert('세션이 만료 되었습니다.');
        window.location.href = '/auth/login?expired';
      }
      if(e.response.status === 400) {
        alert('내용을 4글자 이상 적어주세요');
        return false;
      }
    }
  }

  render() {
    const { handleGoBack, handleOnSubmit } = this;
    const { match } = this.props;
    const { id } = match.params;
    return (
      <EditorHeader
        onGoBack={handleGoBack}
        onSubmit={handleOnSubmit}
        isEdit={id ? true : false}
      />
    );
  };
}

export default connect(
  (state) => ({
    author: state.bulletinEditorModule.get('author'),
    text: state.bulletinEditorModule.get('text'),
    title: state.bulletinEditorModule.get('title'),
    postId: state.bulletinEditorModule.get('postId')
  }),
  (dispatch) => ({
    BulletinEditorActions: bindActionCreators(bulletinEditorActions, dispatch),
    BulletinPostActions: bindActionCreators(bulletinPostActions, dispatch)
  })
)(withRouter(BulletinEditorHeaderContainer));