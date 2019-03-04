import { handleActions, createAction } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as marketAPI from 'lib/api/market/marketAPI';
import { create } from 'domain';

// Sync action type
const GET_POST = 'marketPost/GET_POST';
const INITIALIZEFORM = 'marketPost/INITIALIZEFORM';

// Non-Sync action type
const EDIT_POST_SUBMIT = 'marketEditor/EDIT_POST_SUBMIT';
const REMOVE_POST = 'marketEditor/REMOVE_POST';

// sync actionCreator
export const initializeform = createAction(INITIALIZEFORM);

// Non-sync actionCreator
export const getPost = createAction(GET_POST, marketAPI.getPost);
export const editPostSubmit = createAction(EDIT_POST_SUBMIT, marketAPI.editPost);
export const removePost = createAction(REMOVE_POST, marketAPI.removePost);

const initialState = Map({
  data: Map({})
});

export default handleActions({
  [INITIALIZEFORM]: (state, action) => {
    return initialState;
  },
  ...pender({
    type: GET_POST,
    onSuccess: (state, action) => {
      const { data } = action.payload;
      return state.set('data', fromJS(data));
    }
  })
}, initialState);