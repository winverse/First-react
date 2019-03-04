import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'styles/styleUtils';

import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const Wrapper = styled(Editor)`
  
`;

const editorStyle = {
  padding: '2.5rem 2rem',
  background: 'white',
  userSelect: 'none',
  transform: 'translateY(-2rem)',
  margin: '0 auto',
  minHeight: '35rem',
  width: '1024px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
};

class PostBody extends Component {

  state = {
    editorState: EditorState.createEmpty()
  }

  componentDidUpdate(prevProps, prevState) { // post
    if(prevProps.content !== this.props.content && this.props.content) {
      const html = this.props.content;
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState,
        });
      }
    }
  };

  render() {

    const { content } = this.props;
    const { editorState } = this.state;
    return(
      <Wrapper
        toolbarHidden
        editorState={editorState}
        editorStyle={editorStyle}
        toolbar={{
          image: {
            alignmentEnabled: false
          }
        }}
        readOnly
      />  
    );
  }
}

export default PostBody;