import { handleActions, createAction } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as postAPI from 'lib/api/bulletin/postAPI';

// Sync action type
const INITIALIZE = 'bulletinPost/INITIALIZE';

// Non-Sync action type
const GET_POST = 'bulletinPost/GET_POST';
const REMOVE_POST = 'bulletinPost/REMOVE_POST';

// sync actionCreator
export const initialize = createAction(INITIALIZE);

// Non-sync actionCreator
export const getPost = createAction(GET_POST, postAPI.getPost);
export const removePost = createAction(REMOVE_POST, postAPI.removePost);

const initialState = Map({
  post: Map({})
});

export default handleActions({
  [INITIALIZE]: (state, action)  => {
    return initialState;
  },
  ...pender({
    type: GET_POST,
    onSuccess : (state, action) => {
      const { data: post } = action.payload;
      return state.set('post', fromJS(post));
    }
  })
}, initialState);