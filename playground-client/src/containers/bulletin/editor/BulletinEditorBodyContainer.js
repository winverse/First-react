import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import EditorBody from 'components/bulletin/editor/EditorBody';

import * as bulletinEditorActions from 'store/modules/bulletin/bulletinEditorModule';
import * as bulletinPostActions from 'store/modules/bulletin/bulletinPostModule';

class BulletinEditorContainer extends Component {

  componentDidMount() {
    const { BulletinEditorActions, BulletinPostActions, match, history, location } = this.props;
    BulletinEditorActions.authorSet();
    const { getPost } = this;
    BulletinEditorActions.initialize();
    BulletinPostActions.initialize();
  }

  message = (message) => {
    return <div style={{ fontSize: '1rem' }}>{message}</div>;
  }

  handleTitleChange = (e) => {
    const { BulletinEditorActions } = this.props;
    const { value } = e.target;
    
    BulletinEditorActions.changeTitle(value);
  }

  handleTextChange = (value) => {
    const { BulletinEditorActions } = this.props;
    BulletinEditorActions.changeText(value);
  }

  handleTitleParse = (value) => {
    const { BulletinEditorActions } = this.props;
    BulletinEditorActions.changeTitle(value);
  }


  render() {
    const { handleTitleChange, handleTextChange, handleImagePush, handleTitleParse } = this;
    const { nowTitle, nowText } = this.props;
    const { title, text } = this.props.post.toJS();
    
    return (
      <EditorBody
        onChangeTitle={handleTitleChange}
        onChangeText={handleTextChange}
        onImagePush={handleImagePush}
        nowTitle={nowTitle}
        nowText={nowText}
        editTitle={title}
        editText={text}
        isEdit={text ? true : false }
        onTitleParse={handleTitleParse}
        onTextParse={handleTextChange}
      />
    );
  };
}

export default connect(
  (state) => ({
    nowTitle: state.bulletinEditorModule.get('title'),
    nowText: state.bulletinEditorModule.get('text'),
    post: state.bulletinPostModule.get('post')
  }),
  (dispatch) => ({
    BulletinEditorActions: bindActionCreators(bulletinEditorActions, dispatch),
    BulletinPostActions: bindActionCreators(bulletinPostActions, dispatch)
  })
)(BulletinEditorContainer);