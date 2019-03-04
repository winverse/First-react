import { handleActions, createAction } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as listAPI from 'lib/api/bulletin/listAPI';

// Sync action type

// Non-Sync action type
const GET_POST_LIST = 'bulletinList/GET_POST_LIST';
// sync actionCreator

// Non-sync actionCreator
export const getPostList = createAction(GET_POST_LIST, listAPI.getPostList);

const initialState = Map({
  posts: Map({}),
  lastPage: null
});

export default handleActions({
  ...pender({
    type: GET_POST_LIST,
    onSuccess: (state, action) => {
      const { data: posts } = action.payload;
      const lastPage = action.payload.headers['last-page'];
      return state.set('posts', fromJS(posts)).set('lastPage', lastPage);
    }
  })
}, initialState);