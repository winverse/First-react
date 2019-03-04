import React, { Component } from 'react';
import styles from './EditorBody.scss';
import classNames from 'classnames/bind';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const cx = classNames.bind(styles);

class EditorBody extends Component {

  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const reader = new FileReader(); // eslint-disable-line no-undef
        reader.onload = (e) => {
          resolve({ data: { link: e.target.result } });
        };
        reader.onerror = e => reject(e);
        reader.readAsDataURL(file);
      });
  }

  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });

    const { onChangeText } = this.props;
    
    const values = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    
    onChangeText({ values });
  };
  
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.editText !== this.props.editText && prevProps.isEdit !== this.props.isEdit && this.props.isEdit === true) {
      const html = this.props.editText.values;
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState,
        });
      }
    }

    if(prevProps.editTitle !== this.props.editTitle) {
      const { editTitle, onTitleParse, onTextParse, nowTitle, editText } = this.props;
      onTitleParse(editTitle);
      onTextParse(editText);
    }
  }

  render() {
    const { editorState } = this.state;
    const { onEditorStateChange, uploadImageCallBack } = this;
    const { onChangeTitle, editTitle, editText, isEdit, nowTitle } = this.props;

    if(isEdit && editText === undefined) return;
    return (
      <div className={cx('EditorBox')}>
        <div className={cx('rdw-storybook-root')}>
          <input className={cx('title')} type='text' placeholder='제목을 입력해주세요' onChange={onChangeTitle} value={ !nowTitle ? nowTitle : (nowTitle === '' ? '' : nowTitle)}/>
          <Editor
            editorState={editorState}
            toolbarClassName={cx('rdw-storybook-toolbar')}
            wrapperClassName={cx('rdw-storybook-wrapper')}
            editorClassName={cx('rdw-storybook-editor')}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              image: {
                uploadCallback: uploadImageCallBack,
                previewImage: true,
                alignmentEnabled: false
              }
            }}
            localization={{
              locale: 'ko',
            }}
            placeholder="내용을 입력해주세요"
          />
          {/* <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          /> */}
        </div>
      </div>
    );
  };
} 

export default EditorBody;