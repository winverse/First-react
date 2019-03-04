import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map } from 'immutable';

import * as userAPI from 'lib/api/auth/userAPI';

const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO';
const CHECK_STATUS = 'user/CHECK_STATUS';
const LOGOUT = 'user/LOGOUT';

export const setLoggedInfo = createAction(SET_LOGGED_INFO, loggedInfo => loggedInfo);
export const checkStatus = createAction(CHECK_STATUS, userAPI.checkStatus);
export const logout = createAction(LOGOUT, userAPI.logout);

const initialState = Map({
  loggedInfo: Map({
    userName: null,
    thumbnail: null
  }),
  logged: false,
  validated: false
});

export default handleActions({
  [SET_LOGGED_INFO]: (state, { payload: loggedInfo }) => {
    return state.set('loggedInfo', Map(loggedInfo)).set('logged', true);
  },
  ...pender({
    type: CHECK_STATUS,
    onSuccess: (state, action) => {
      const { data } = action.payload;
      return state.set('validated', data);
    }
  }),
  ...pender({
    type: LOGOUT,
    onSuccess: (state, action) => {
      const { data } = action.payload;
      return state.set('logged', data);
    }
  }) 
}, initialState);