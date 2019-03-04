import { handleActions, createAction } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as registerAPI from 'lib/api/auth/registerAPI';
import * as userAPI from 'lib/api/auth/userAPI';

// Non-sync 
const INITIALIZE_FORM = 'register/INTIALIZE_FORM';
const CHANGE_INPUT   = 'resgister/INPUT_CHAGNE';
const SET_ERROR = 'register/SET_ERROR';
const SET_JOB = 'register/SET_JOB';

// Sync
const REGISTER = 'register/REGISTER';
const CHECK_USERID_EXISTS = 'register/CHECK_USERID_EXISTS';
const CHECK_USERNAME_EXISTS = 'register/CHECK_USERNAME_EXISTS';

// Non-sync 
export const initializeForm = createAction(INITIALIZE_FORM);
export const changeInput = createAction(CHANGE_INPUT, ({ name, value }) => ({ name, value })); 
export const setError = createAction(SET_ERROR, ({ name, message }) => ({ name, message }));
export const setJob = createAction(SET_JOB, job => job );

// Sync
export const register = createAction(REGISTER, registerAPI.register);
export const checkUseridExists = createAction(CHECK_USERID_EXISTS, registerAPI.checkUserIdExists);
export const checkUsernameExists = createAction(CHECK_USERNAME_EXISTS, registerAPI.checkUserNameExists);

const initialState = Map({
  register: Map({
    userJob:'',
    userId: '',
    userName: '',
    password: ''
  }),
  error: Map({
    userJobError: '',
    userIdError: '',
    userNameError: '',
    passwordError: ''
  }),
  exists: Map({
    userIdExists: false,
    userNameExists: false
  }),
  result: Map({}) // After register user, user information put in
});

export default handleActions({
  [INITIALIZE_FORM]: (state, action) => initialState,
  [CHANGE_INPUT]: (state, { payload: { name, value } }) => {
    return state.setIn(['register', name], value);
  },
  [SET_ERROR]: (state, { payload: { name, message } }) => {
    return state.setIn(['error', name], message);
  },
  [SET_JOB]: (state, { payload : job }) => {
    return state.setIn(['register', 'userJob'], job);
  },
  ...pender({
    type: REGISTER,
    onSuccess: (state, action) => {
      const { data } = action.payload;
      return state.set('result', Map(data));
    }
  }),
  ...pender({
    type: CHECK_USERID_EXISTS,
    onSuccess: (state, action) => {
      const { data } = action.payload;
      return state.setIn(['exists', 'userIdExists'], data);
    }
  }),
  ...pender({
    type: CHECK_USERNAME_EXISTS,
    onSuccess: (state, action) => {
      const { data } = action.payload;
      return state.setIn(['exists', 'userNameExists'], data);
    }
  })
}, initialState);