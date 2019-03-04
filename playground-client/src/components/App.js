import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer } from 'react-toastify';

import storage from 'lib/storage';
import * as userActions from 'store/modules/auth/userModule';

import {
  HomePage,
  // AUTH
  LoginPage,
  RegisterPage,

  // HUREM
  HuremPage,

  // BULLETIN
  BulletinPostPage,
  BulletinListPage,
  BulletinEditorPage,
  
  // MARKET 
  MarketListPage,
  MarketEditorPage,
  MarketPostPage,

  //VOUCHER
  VoucherPage,
  // COMMON
  NotFoundPage
} from 'pages';

class App extends Component {

  initialUserInfo = async () => {
    const { UserActions } = this.props;
    const loggedInfo = storage.get('loggedInfo');
    if(!loggedInfo) return;
    UserActions.setLoggedInfo(loggedInfo);
    try{
      await UserActions.checkStatus();
    } catch (e) {
      storage.remove('loggedInfo');
      alert('세션이 만료 되었습니다.');
      window.location.href = '/auth/login?expired';
    }
  }

  componentDidMount() {
    this.initialUserInfo();
  }
  
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={HuremPage}/>

          {/* AUTH */}
          <Route path="/auth/register" component={RegisterPage}/>
          <Route path="/auth/login" component={LoginPage}/>

          {/* Hurem */}
          <Route path="/hurem" component={HuremPage}/>

          {/* BULLETIN */}
          <Route exact path="/bulletin" component={BulletinListPage}/>
          <Route path="/bulletin/page/:page" component={BulletinListPage}/>
          <Route path="/bulletin/post/:id" component={BulletinPostPage}/>
          <Route exact path="/bulletin/editor" component={BulletinEditorPage}/>
          <Route path="/bulletin/editor/:id" component={BulletinEditorPage}/>

          {/* Market */}
          <Route exact path="/market" component={MarketListPage}/>
          <Route exact path="/market/editor" component={MarketEditorPage}/>
          <Route path="/market/editor/:id" component={MarketEditorPage}/>
          <Route path="/market/post/:id" component={MarketPostPage}/>
          
          {/* VOUCHER */}
          <Route path="/voucher" component={VoucherPage}/>

          {/* Not found */}
          <Route component={NotFoundPage}/>
        </Switch>
        <ToastContainer style={{ zIndex: 20 }} position="bottom-right"/>
      </Fragment>
    );
  }
}

export default withRouter(connect(
  null,
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(App));
