import { handleActions, createAction } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as userAPI from 'lib/api/auth/userAPI';
import * as editorAPI from 'lib/api/bulletin/editorAPI';

// Sync action type
const INITIALIZE = 'bulletinEditor/INITIALIZE';
const CHANGE_TITLE = 'bulletinEditor/CHANGE_INPUT';
const CHANGE_TEXT = 'bulletinEditor/CHANGE_TEXT';
const EDIT_POST = 'bulletinEditor/EDIT_POST';
const INITIALIZE_TEXT = 'bulletinEditor/INITIALIIZE_TEXT';

// Non-Sync action type
const AUTHOR_SET = 'bulletinEditor/AUTHIR_SET';
const WRITE_POST = 'bulletinEditor/WRITE_POST';

// sync actionCreator
export const initialize = createAction(INITIALIZE);
export const changeTitle = createAction(CHANGE_TITLE, value => value);
export const changeText = createAction(CHANGE_TEXT);
export const initializeText = createAction(INITIALIZE_TEXT);


// Non-sync actionCreator
export const authorSet = createAction(AUTHOR_SET, userAPI.checkStatus);
export const writePost = createAction(WRITE_POST, editorAPI.writePost);
export const editPost = createAction(EDIT_POST, editorAPI.editPost);

const initialState = Map({
  author: '',
  title: '',
  text: '',
  postId: null
});

export default handleActions({
  [INITIALIZE]: (state, action) => initialState,
  [CHANGE_TITLE]: (state, { payload: value }) => {
    return state.set('title', value);
  },
  [CHANGE_TEXT]: (state, action) => {
    return state.set('text', Map(action.payload));
  },
  [INITIALIZE_TEXT]: (state, action) => {
    return state.set('text', Map(action.payload));
  }, 
  ...pender({
    type: AUTHOR_SET,
    onSuccess: (state, action) => {
      const { userName } = action.payload.data;
      return state.set('author', userName);
    }
  }),
  ...pender({
    type: WRITE_POST,
    onSuccess: (state, action) => {
      const { _id } = action.payload.data;
      return state.set('postId', _id);
    }
  })
}, initialState);