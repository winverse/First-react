import { handleActions, createAction } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as userAPI from 'lib/api/auth/userAPI';

const INITIALIZE_FORM = 'register/INTIALIZE_FORM';
const CHANGE_INPUT = 'login/CHAGE_INPUT';
const SET_ERROR = 'login/SET_ERROR';

// sync 
const LOGIN = 'login/LOGIN';

export const initializeForm = createAction(INITIALIZE_FORM);
export const changeInput = createAction(CHANGE_INPUT, ({ name, value }) => ({ name, value }));
export const setError = createAction(SET_ERROR, ({ name, message }) => ({ name, message }));

// sync
export const login = createAction(LOGIN, userAPI.login);

const initialState = Map({
  loginForm: Map({
    userId: '',
    password: ''
  }),
  error: Map({
    userIdError: '',
    passwordError: ''
  }),
  result: Map({})
});

export default handleActions({
  [INITIALIZE_FORM]: (state, action) => initialState,
  [CHANGE_INPUT]: (state, { payload: { name, value } }) => {
    return state.setIn(['loginForm', name], value);
  },
  [SET_ERROR]: (state, { payload: { name, message } }) => {
    return state.setIn(['error', name], message);
  },
  ...pender({
    type: LOGIN,
    onSuccess: (state, action) => {
      const { data } = action.payload;
      return state.set('result', Map(data));
    }
  })
}, initialState);