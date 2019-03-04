import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import PostBody from 'components/bulletin/post/PostBody';
import PostInfo from 'components/bulletin/post/PostInfo';

import * as bulletinPostActions from 'store/modules/bulletin/bulletinPostModule';
import * as baseActions from 'store/modules/base/baseModule';

class BulletinPostContainer extends Component {

  message = (message) => {
    return <div style={{ fontSize: '1rem' }}>{message}</div>;
  }

  initialize = async () => {
    const { BulletinPostActions, match } =  this.props;
    const { id } = match.params;
    try {
      await BulletinPostActions.getPost(id);
    } catch (e) {
      console.log(e);
    }

  }

  handleRemove = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal('remove'); 
  }
 
  componentDidMount() {
    const { history, match } = this.props;
    const { id } = match.params;
    
    const idPattern = /^[a-f\d]{24}$/i;
    if(!idPattern.test(id)){
      toast(this.message('허용되지 않은 접근입니다.'), { type: 'error' });
      history.push('/');
      return;
    }

    this.initialize();
  }

  componentWillMount() {
    const { BulletinPostActions } = this.props;
    BulletinPostActions.initialize();
  }

  render() {
    const { handleRemove } = this;
    const { post, logged, loggedInfo } = this.props;
    const { userName } = loggedInfo.toJS();
    const { createAt, author, text, title, _id } = post.toJS();

    return (
      <Fragment>
        <PostInfo 
          title={title} 
          createAt={createAt} 
          author={author} 
          logged={logged} 
          loggedUserName={userName} 
          id={_id}
          onRemove={handleRemove}
        />
        <PostBody text={text}/>
      </Fragment>
    );
  };
}

export default connect(
  (state) => ({
    post: state.bulletinPostModule.get('post'),
    logged : state.userModule.get('logged'),
    loggedInfo: state.userModule.get('loggedInfo')
  }),
  (dispatch) => ({
    BulletinPostActions: bindActionCreators(bulletinPostActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(BulletinPostContainer));