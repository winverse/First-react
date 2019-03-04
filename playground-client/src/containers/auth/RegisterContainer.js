import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import  debounce from 'lodash/debounce';

import * as registerActions from 'store/modules/auth/registerModule';
import * as userActions from 'store/modules/auth/userModule';

import storage from 'lib/storage';

import {
  Register,
  RegisterForm,
  LabelWithInput,
  RegisterButton,
  JobSection
} from 'components/auth/Register';

class RegisterContainer extends Component {

  validate = {
    userJob: (value) => {
      if(value.length < 1) {
        this.setError('userJobError', '이용목적을 입력해주세요');
        return false;
      }
      this.setError('userJobError', '');
      return true;
    },
    userId: (value) => {
      const userIdPattern = /^[a-zA-Z0-9]{4,10}$/;
      if(value === '') {
        this.setError('userIdError', '아이디를 입력해주세요');
        return false;
      }
      if(!userIdPattern.test(value)) {
        this.setError('userIdError', '아이디는 4~10자이며, 영문/숫자가 허용됩니다.');
        return false;
      }
      this.setError('userIdError', '');
      return true;
    },
    userName: (value) => {
      const userNamePattern = /^[a-zA-Z0-9가-힣]{2,10}$/;
      if(value.length < 1) {
        this.setError('userNamev', '닉네임을 입력해주세요');
        return false;
      }
      if(!userNamePattern.test(value)) {
        this.setError('userNameError', '닉네임은 2~10자의 한글/영문/숫자가 허용됩니다.');
        return false;
      }
      this.setError('userNameError', '');
      return true;
    },

    password: (value) => {
      const passwordPattern = /^[a-zA-Z0-9가-힣!@#$%^*+=-]{6,15}$/;
      if(value.length < 1) {
        this.setError('passwordError', '패스워드를 입력해주세요!');
        return false;
      }
      if(!passwordPattern.test(value)) {
        this.setError('passwordError', '패스워드는 6~15로 해주세요');
        return false;
      }
      this.setError('passwordError', '');
      return true;
    }
  }

  setError = (name, message) => {
    const { RegisterActions } = this.props;
    RegisterActions.setError({ name, message });
    return false;
  }
  
  handleJobClick = (e) => {
    const { RegisterActions } = this.props;
    let value = e.target.getAttribute('value');
    RegisterActions.setJob(value);
  } 

  handleChange = (e) => {
    const { RegisterActions } = this.props;
    const { name, value } = e.target;
    
    RegisterActions.changeInput({ name, value });
    
    const validate = this.validate[name](value);
    if(!validate) return false;
      
    this.checkValidate(name, value);
  }

  checkValidate = (name, value) => {
    if(name === 'userId') {
      this.checkUserIdExists(value);
    } else if ( name === 'userName') {
      this.checkUserNameExists(value);
    } else {
      return true;
    }
  };

  checkUserIdExists = debounce(async (userId) => {
    const { RegisterActions, exists } = this.props;
    try{
      await RegisterActions.checkUseridExists(userId);
      if(this.props.exists.toJS().userIdExists.exists === true ){
        console.log(3);
        this.setError('userIdError', '이미 아이디가 존재합니다.');
        return false;
      } else {
        this.setError('userIdError', '');
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  checkUserNameExists = debounce(async (userName) => {
    const { RegisterActions, exists } = this.props;

    try{
      await RegisterActions.checkUsernameExists(userName);
      if(this.props.exists.toJS().userNameExists.exists === true) {
        this.setError('userNameError', '이미 닉네임이 존재합니다.');
        return false;
      } else {
        this.setError('userNameError', '');
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  handleRegister = async () => {
    const { UserActions, RegisterActions, register, error, history } = this.props;
    const { userJob, userId, userName, password } = register.toJS();
    const { userJobError, userIdError, userNameError, passwordError } = error.toJS();
    const { validate } = this;
   
    if(userJobError !== '' || userIdError !== '' || userNameError !== '' || passwordError !== '') {
      alert('회원정보를 바르게 입력해주세요.');
      return false;
    }

    if(!validate['userJob'](userJob)) {
      this.setError('userJobError', '이용목적을 선택해주세요');
      return false;
    };

    if(!validate['userId'](userId) || !validate['userName'](userName) || !validate['password'](password)){
      alert('회원정보를 바르게 입력해주세요.');
      return false;
    }
    
    try{
      await RegisterActions.register({ userJob, userId, userName, password });
      const loggedInfo = this.props.result.toJS();
      storage.set('loggedInfo', loggedInfo);
      UserActions.setLoggedInfo(loggedInfo);
      UserActions.checkStatus(true);
      alert('안녕~');
      history.push('/');
    } catch (e) {
      if(e.response.status === 409) {
        const { key } = e.response.data;
        const message = key === 'userId' ? '이미 존재하는 아이디입니다.' : '이미 존재하는 닉네임입니다.';
        return this.setError(key, message);
      }
      alert('알 수 없는 에러가 발생 ㅜ_ㅜ');
    }
  }

  handleKeyPress = (e) => {
    const { key } = e;
    if(key === 'Enter') {
      this.handleRegister();
    }
  }
  
  componentWillUnmount() {
    const { RegisterActions } = this.props;
    RegisterActions.initializeForm();
  };

  render() {
    const { handleChange, handleRegister, handleJobClick } = this;
    const { register, error } = this.props;
    const { userJobError, userIdError, userNameError, passwordError } = error.toJS(); 
    const { userJob, userId, userName, password } = register.toJS();

    return (
      <Register>
        <RegisterForm>
          <JobSection jobClick={handleJobClick} selected={userJob} error={userJobError}/>
          <LabelWithInput label='아이디' placeholder='아이디를 입력해주세요' type='text' name='userId'
            handleChange={handleChange} value={userId} error={userIdError}/>
          <LabelWithInput label='닉네임' placeholder='닉네임을 입력해주세요' type='text' name='userName' 
            handleChange={handleChange} value={userName} error={userNameError}/>
          <LabelWithInput label='비밀번호' placeholder='비밀번호를 입력해주세요' type='password' name='password' 
            handleChange={handleChange} value={password} error={passwordError}/>
          <RegisterButton handleRegister={handleRegister}/>
        </RegisterForm>
      </Register>
    );
  };
}

export default connect(
  (state) => ({
    register: state.registerModule.get('register'),
    error: state.registerModule.get('error'),
    result: state.registerModule.get('result'),
    exists: state.registerModule.get('exists')
  }),
  (dispatch) => ({
    RegisterActions: bindActionCreators(registerActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(withRouter(RegisterContainer));