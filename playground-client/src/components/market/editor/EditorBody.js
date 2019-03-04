import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const Body = styled(Editor)`
  position: relative;
`;

const Textarea = styled.textarea`
  position: absolute;
  top: 100px;
  left: 0;
  min-height: 500px;
  width: 300px;
`;

const editorStyle = {
  background: 'white',
  userSelect: 'none',
  margin: '0 auto',
  width: '100%',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  height: '65vh', 
  padding: '1rem 2rem', 
  fontSize: '1.15rem'
};

const toolbarStyle = {
  marginTop: '0.3rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
};

class EditorBody extends Component {

  uploadImageCallBack = (file) => {
    const { history } = this.props;
    return new Promise(
      (resolve, reject) => {
        const reader = new FileReader(); // eslint-disable-line no-undef
        const data = new FormData();
        reader.onload = (e) => {
          data.append('file', file);
          axios.post('/api/market/upload', data)
            .then(function (res) {
              resolve({ data: { link: `https://d1p2hc57xmyo23.cloudfront.net/${res.data}` } });
            })
            .catch(function (err) {
              if(err) {
                console.log('알 수 없는 에러가 발생했습니다.', err);
                history.replace();
                return;
              }
              console.log(err);
            });
          console.log(e);
        };
        reader.onerror = e => reject(e);
        reader.readAsDataURL(file);
      });
  }

  state = {
    editorState: EditorState.createEmpty(),
  }
  
  onEditorStateChange = (editorState) => {
    const { onContentChange } = this.props;
    this.setState({
      editorState,
    });
    const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onContentChange(value);
  };

  componentDidMount() {
    const { value } = this.props;
    if(!value) return;
    const html = this.props.value;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState,
      });
    }
  }

  render() {
    const { editorState } = this.state;
    const { uploadImageCallBack, onEditorStateChange } = this;

    return (
      <Fragment>
        <Body
          editorState={editorState}
          toolbarStyle={toolbarStyle}
          editorStyle={editorStyle}
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
      </Fragment>
    );
  }
}

export default EditorBody;
