import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import storage from 'lib/storage';

import * as baseActions from 'store/modules/base/baseModule';
import * as userActions from 'store/modules/auth/userModule';
import * as marketEditorActions from 'store/modules/market/marketEditorModule';
import * as marketPostActions from 'store/modules/market/marketPostModule';

import NavContainer from 'containers/base/NavContainer';

import { 
  Header, 
  HeaderContents,
  HeaderNav,
  HeaderButtonSection
} from 'components/common/Header';

class HeaderContainer extends Component {

  handleClick = () => {
    const { BaseActions, visible } = this.props;
    BaseActions.setNavVisibility(!visible);
  }

  handleLogoutClick = async (e) => {
    const { UserActions } = this.props;
    try{
      UserActions.logout();
      alert('로그아웃 되었습니다.');
      storage.remove('loggedInfo');
      window.location.href = '/';
    } catch (e) {
      console.log(e);
    }
  }

  message = (message) => {
    return <div style={{ fontSize: '1rem' }}>{message}</div>;
  }

  handleMarketWritePost = async () => {
    const { MarketEditorActions, author, title, content, history, price } = this.props;
    const { message } = this;

    if(!author) {
      alert('알 수 없는 에러가 발생했습니다.');
      history.replace();
      return;
    }

    if(!title || !content || !price) {
      return toast(message('필 수 항목을 입력해주세요'), { type: 'error' });
    }

    if(title && title.length < 4) {
      return toast(message('제목을 4글자 이상 입력해주세요'), { type: 'error' });
    }
    
    if(content && content.length < 12) {
      return toast(message('내용을 4글자 이상 입력해주세요!'), { type: 'error' });
    };

    if(price === '') {
      return toast(message('원하는 가격을 적어주세요!'), { type: 'error' });
    }
    
    try {
      await MarketEditorActions.writePost({ author, title, content, price });
      toast(message('글이 작성되었습니다.'), { type: 'success' });
      history.push(`/market/post/${this.props.postId}`);
    } catch (e) {
      console.log(e);
    }
  }

  handleMarketEdit = async () => {
    const { match, history, MarketPostActions, postId, author, title, content, price } = this.props;
    const { message } = this;
    const { id } = match.params;

    if(!author) {
      alert('알 수 없는 에러가 발생했습니다.');
      history.replace();
      return;
    }

    if(!title || !content || !price) {
      return toast(message('필 수 항목을 입력해주세요'), { type: 'error' });
    }

    if(title && title.length < 4) {
      return toast(message('제목을 4글자 이상 입력해주세요'), { type: 'error' });
    }
    
    if(content && content.length < 12) {
      return toast(message('내용을 4글자 이상 입력해주세요!'), { type: 'error' });
    };

    if(price === '') {
      return toast(message('원하는 가격을 적어주세요!'), { type: 'error' });
    }

    try {
      await MarketPostActions.editPostSubmit({ id, title, author, content, price });
      toast(message('글이 성공적으로 수정 되었습니다'), { type: 'success' });
      history.push(`/market/post/${id}`);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { page, match } = this.props;
    const { id } = match.params;
    const { thumbnail, userName } = this.props.loggedInfo.toJS();
    const { handleClick, handleLogoutClick, handleMarketWritePost, handleMarketEdit } = this;

    return (
      <Fragment>
        <Header page={page}>
          <HeaderContents>
            <HeaderNav display='desktop'/>
            <HeaderButtonSection
              handleClick={handleClick} 
              thumbnail={thumbnail} 
              userName={userName} 
              logout={handleLogoutClick} 
              page={page}
              onMarketWrite={handleMarketWritePost}
              onMarketEdit={handleMarketEdit}
              isEdit={id ? true : false}
            />
          </HeaderContents>
          <NavContainer thumbnail={thumbnail} userName={userName}/>
        </Header>
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({
    visible: state.baseModule.getIn(['nav', 'visible']),
    loggedInfo: state.userModule.get('loggedInfo'),
    author: state.marketEditorModule.get('author'),
    title: state.marketEditorModule.get('title'),
    content: state.marketEditorModule.get('content'),
    price: state.marketEditorModule.get('price'),
    postId: state.marketEditorModule.get('postId'),
    data: state.marketPostModule.get('data')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    MarketEditorActions: bindActionCreators(marketEditorActions, dispatch),
    MarketPostActions: bindActionCreators(marketPostActions, dispatch)
  })
)(withRouter(HeaderContainer));