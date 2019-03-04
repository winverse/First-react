import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

import * as huremListActions from 'store/modules/hurem/huremListModule';
import { setRelayoutHandler } from 'lib/withRelayout';

import {
  PostList
} from 'components/hurem/HuremPostList';

class HuremPostListContainer extends Component {
  prev = null;
  
  handleRelayout = () => {
    setTimeout(() => this.masonry.masonry.layout(), 0);
  }

  listLoad = async () => {
    const { HuremListActions } = this.props;
    try {
      await  HuremListActions.loadPost();

      const { next } = this.props;
  
      if(next) {
        // 다음 불러올 포스트들이 있다면 미리 로딩을 해둔다.
  
        await HuremListActions.prefetchPost(next);
      }
    } catch (e) {
      console.log(e);
    }
  }

  loadNext = async () => {
    const { HuremListActions, next } = this.props;
    HuremListActions.showPrefetchedPost(); // 미리 불러왔던것을 보여준다.

    if(next === this.prev || !next) return; // 이전에 했던 요청과 동일하면 요청하지 않는다.
    this.prev = next;

    // 다음 데이터 요청
    try {
      await HuremListActions.prefetchPost(next);
    } catch (e) {
      console.log(e);
    }
    this.handleScroll();
  }

  handleScroll = () => {
    const { nextData } = this.props;
    if(nextData.size === 0) return; // 미리 불러온 데이터가 없다면 중지

    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    if(scrollHeight - innerHeight - scrollTop < 400) {
      this.loadNext();
    }
  }

  handleCheckLike = async ({ postId, likes }) => {
    const { HuremListActions, loginUserName } = this.props;
    if(likes.indexOf(loginUserName) > -1) {
      try {
        await HuremListActions.checkLike({ postId, value: true });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await HuremListActions.checkLike({ postId, value: false });
      } catch (e) { 
        console.log(e);
      }
    }
  }

  handleToggleLike = async ({ postId, postUserName, likes }) => { // 좋아요 관련
    const { HuremListActions, logged, loginUserName } = this.props;
    
    const message = (message) => (<div style={{ fontSize: '1.1rem' }}>{message}</div>);

    if(!logged) {
      return toast(message('로그인 후 이용 하실 수 있습니다.'), { type: 'error' });
    }
   
    if(postUserName === loginUserName) {
      return toast(message('자신의 글에는 좋아요를 할 수 없습니다.'), { type: 'error' });
    }
    
    if(likes.indexOf(loginUserName) > -1) { // 값이 있으면
      try {
        await HuremListActions.unlikePost(postId);
        await HuremListActions.checkLike({ postId, value: false });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await HuremListActions.likePost(postId);
        await HuremListActions.checkLike({ postId, value: true });
      } catch (e) {
        console.log(e);
      }
    }
  }

  handleCommentClick = (postId) => {
    const { HuremListActions } = this.props;
    HuremListActions.toggleComment(postId);
    setTimeout(() => this.masonry.masonry.layout(), 0);
  }

  componentDidMount() {
    this.listLoad();
    window.addEventListener('scroll', this.handleScroll);
    setRelayoutHandler(this.handleRelayout);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { data, loginUserName, thumbnail } = this.props; 
    const { handleToggleLike, handleArrayCheck, handleCheckLike, handleCommentClick } = this;

    return (
      <PostList
        posts={data}
        onToggleLike={handleToggleLike}
        loginUserName={loginUserName}
        handleArrayCheck={handleArrayCheck}
        handleCheckLike={handleCheckLike}
        onCommentClick={handleCommentClick}
        thumbnail={thumbnail}
        mansonryRef={ref => this.masonry = ref}
      />
    );
  };
}

export default connect(
  (state) => ({
    next: state.huremListModule.get('next'),
    data: state.huremListModule.get('data'),
    nextData: state.huremListModule.get('nextData'),
    logged: state.userModule.get('logged'),
    loginUserName: state.userModule.getIn(['loggedInfo', 'userName']),
    thumbnail: state.userModule.getIn(['loggedInfo', 'thumbnail']),
    check: state.huremListModule.get('check')
  }),
  (dispatch) => ({
    HuremListActions: bindActionCreators(huremListActions, dispatch)
  })
)(withRouter(HuremPostListContainer));