import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import * as loginActions from 'store/modules/auth/loginModule';
import * as userActions from 'store/modules/auth/userModule';
import storage from 'lib/storage';

import { 
  Login,
  ErrorMessage,
  LabelWithInput,
  LoginButton,
  LoginForm
} from 'components/auth/Login';

class LoginContainer extends Component {

  validate = {
    userId: (value) => {
      if(value.length < 1) {
        this.setError('userIdError', '아이디를 입력해주세요');
        return false;
      }
      this.setError('userIdError', '');
      return true;
    },
    password: (value) => {
      if(value.length < 1) { 
        this.setError('passwordError', '패스워드를 입력해주세요');
        return false;
      }
      this.setError('passwordError', '');
      return true;
    }
  }

  setError = (name, message) => {
    const { LoginActions } = this.props;
    LoginActions.setError({ name, message });
    return false;
  }

  handleChange = (e) => {
    const { validate } = this;
    const { LoginActions } = this.props;
    const { name, value } = e.target;
    LoginActions.changeInput({ name, value });

    const check = validate[name](value);
    if(!check) return;
  }

  handleKeyPress = (e) => {
    const { key } = e;
    if(key === 'Enter') {
      this.handleLogin();
    }
  }
  
  handleLogin = async () => {
    const { loginForm, LoginActions, UserActions, history, result } = this.props;
    const { userId, password } = loginForm.toJS();

    try {
      await LoginActions.login({ userId, password });
      const loggedInfo = this.props.result.toJS();
      storage.set('loggedInfo', loggedInfo);
      UserActions.setLoggedInfo(loggedInfo);
      UserActions.checkStatus(true);
      alert('환영~');
      history.push('/');
    } catch (e) {
      this.setError('passwordError', '잘못된 계정 정보입니다.');
      console.log(e);
    }
  } 

  componentWillUnmount() {
    const { LoginActions } = this.props;
    LoginActions.initializeForm(); 
  }

  componentDidMount() {
    const { location } = this.props;
    const query = queryString.parse(location.search);

    if(query.expired !== undefined) {
      this.setError('passwordError', '세션이 만료 되었습니다. 다시 로그인해주세요');
    };
  }

  render() {
    const { handleChange, handleLogin, handleKeyPress } = this;
    const { error, loginForm } = this.props;
    const { userId, password } = loginForm.toJS();
    const { userIdError, passwordError } = error.toJS();
    return (
      <Login>
        <LoginForm>
          <LabelWithInput label='아이디' placeholder='아이디를 입력해주세요' name='userId' value={userId} onChange={handleChange} type="text" error={userIdError}/>
          <LabelWithInput label='비밀번호' placeholder='비밀번호를 입력해주세요' name='password' value={password} onChange={handleChange} type="password" error={passwordError} onKeyPress={handleKeyPress}/>
          <LoginButton handleLogin={handleLogin}/>
        </LoginForm>
      </Login>
    );
  };
}

export default withRouter(connect(
  (state) => ({
    error: state.loginModule.get('error'),
    loginForm: state.loginModule.get('loginForm'),
    result: state.loginModule.get('result')
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
    LoginActions: bindActionCreators(loginActions, dispatch)
  })
)(LoginContainer));