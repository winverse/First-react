import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PostList from 'components/bulletin/list/PostList';
import PageTemplate from 'components/common/PageTemplate';
import ListWrapper from 'components/bulletin/list/ListWrapper';
import Pagenation from 'components/bulletin/list/Pagenation';

import * as bulletinListActions from 'store/modules/bulletin/bulletinListModule';

class BulletinListContainer extends Component {

  getPostList  = () => {
    const { page, BulletinListActions } = this.props;
    BulletinListActions.getPostList({
      page
    });
  }

  componentDidMount() {
    this.getPostList();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.page !== this.props.page ) {
      this.getPostList();
    }
    let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    scrollTop = 0;
  }

  render() {
    const { loading, posts, page, lastPage } = this.props;

    if(loading) return null;
    
    return (
      <PageTemplate>
        <ListWrapper>
          <PostList posts={posts}/>
          <Pagenation page={page} lastPage={lastPage}/>
        </ListWrapper>
      </PageTemplate>
    );
  };
}

export default connect(
  (state) => ({
    lastPage: state.bulletinListModule.get('lastPage'),
    posts: state.bulletinListModule.get('posts'),
    loading: state.pender.pending['bulletinList/GET_POST_LIST']
  }),
  (dispatch) => ({
    BulletinListActions: bindActionCreators(bulletinListActions, dispatch)
  })
)(BulletinListContainer);