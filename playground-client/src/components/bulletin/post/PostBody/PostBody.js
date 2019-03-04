import React, { Component } from 'react';
import styles from './PostBody.scss';
import classNames from 'classnames/bind';
import { Map, fromJS } from 'immutable';

import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const cx = classNames.bind(styles);

class PostBody extends Component {

  state = {
    editorState: EditorState.createEmpty()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.text !== this.props.text && this.props.text !== undefined) {
      const html = this.props.text.values;
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState,
        });
      }
    }
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className={cx('post-body')}>
        <div className={cx('paper')}>
          <Editor
            toolbarHidden
            editorState={editorState}
            toolbarClassName={cx('rdw-storybook-toolbar')}
            wrapperClassName="rdw-storybook-wrapper"
            editorClassName="rdw-storybook-editor"
            toolbar={{
              image: {
                alignmentEnabled: false
              }
            }}
            readOnly
          />
        </div>
      </div>
    );
  }
}


export default PostBody;