import { handleActions, createAction } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as marketAPI from 'lib/api/market/marketAPI';

// Sync action type
const INITIALIZE_FORM = 'marketEditor/INITIALIZE_FORM';
const TITLE_INPUT_CHANGE = 'marketEditor/TITLE_INPUT_CHANGE';
const CONTENT_CHANGE = 'marketEditor/CONTENT_CHANGE';
const AUTHOR_SET = 'marketEditor/AUTHOR_SET';
const EDITOR_INITIALIZE = 'marketEditor/EDITOR_INITAILIZE';
const EDIT_POST_CLICK = 'marketEditor/EDIT_POST_CLICK';
const PRICE_INPUT_CHANGE = 'marketEditor/PRICE_INPUT_CHANGE';

// Non-Sync action type
const WRITE_POST = 'marketEditor/WRITE_POST'; 

// sync actionCreator
export const initializeForm = createAction(INITIALIZE_FORM);
export const titleInputChange = createAction(TITLE_INPUT_CHANGE, value => value);
export const contentChange = createAction(CONTENT_CHANGE, value => value);
export const authorSet = createAction(AUTHOR_SET, value => value);
export const editorInitialize = createAction(EDITOR_INITIALIZE, ({ author, title, content }) => ({ author, title, content }));
export const editPostClick = createAction(EDIT_POST_CLICK, ({ title, content, price }) => ({ title, content, price }));
export const priceInputChange = createAction(PRICE_INPUT_CHANGE, value => value);

// Non-sync actionCreator
export const writePost = createAction(WRITE_POST, marketAPI.writePost);

const initialState = Map({
  author: '',
  title: '',
  content: '',
  price: '',
  postId: null
});

export default handleActions({
  [INITIALIZE_FORM]: (state, action) => initialState,
  [AUTHOR_SET]: (state, { payload: value }) => {
    return state.set('author', value);
  },
  [TITLE_INPUT_CHANGE]: (state, { payload: value }) => {
    return state.set('title', value);
  },
  [CONTENT_CHANGE]: (state, { payload: value }) => {
    return state.set('content', value);
  },
  [EDIT_POST_CLICK]: (state, { payload: { title, content, price } }) => {
    return state.set('title', title).set('content', content).set('price', price);
  },
  [PRICE_INPUT_CHANGE]: (state, { payload: value }) => {
    const parserValue = value.replace(/[^\d]+/g, '');
    return state.set('price', parserValue);
  },
  ...pender({
    type: WRITE_POST,
    onSuccess: (state, action) => {
      const { data } = action.payload;
      return state.set('postId', data);
    }
  })

}, initialState);