import { handleActions, createAction } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as marketAPI from 'lib/api/market/marketAPI';

// Sync action type
const INITIALIZE = 'marketComment/INITIALIZE';
const CHANGE_INPUT = 'marketComment/CHANGE_INPUT';
const TOGGLE_RECOMMENT = 'marketComment/TOGGLE_RECOMMNET';
const CHANGE_RECOMMENT_INPUT = 'marketComment/CHANGE_RECOMMENT_INPUT';

// Non-Sync action type
const SUBMIT_COMMENT = 'marketComment/SUBMIT_COMMENT';
const GET_COMMENT = 'marketComment/GET_COMMENT';
const SUBMIT_RECOMMENT = 'marketComment/SUBMIT_RECOMMENT';

// sync actionCreator
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT, value =>  value);
export const toggleRecomment = createAction(TOGGLE_RECOMMENT, postId => postId);
export const changeRecommentInput = createAction(CHANGE_RECOMMENT_INPUT, ({ postId, value }) => ({ postId, value }));

// Non-sync actionCreator
export const submitComment = createAction(SUBMIT_COMMENT, marketAPI.submitComment);
export const getComments = createAction(GET_COMMENT, marketAPI.getComments);
export const submitRecomment = createAction(SUBMIT_RECOMMENT, marketAPI.submitRecomment, ({ commentId }) => commentId);

const initialState = Map({
  comment:'',
  comments: List(),
  reComment: Map({
    postId: Map({
      visible: true,
      value: ''
    })
  })
});

export default handleActions({
  [INITIALIZE]: (state, action) => initialState,
  [CHANGE_INPUT]: (state, { payload: value }) => {
    return state.set('comment', value);
  },
  [TOGGLE_RECOMMENT]: (state, { payload: postId }) => {
    const comment = state.getIn(['reComment', postId]);
    if(comment) {
      return state.updateIn(['reComment', postId], comment => comment.update('visible', visible => !visible));
    }
    return state.setIn(['reComment', postId], Map({ 
      visible: true,
      value: ''
    }));
  },
  [CHANGE_RECOMMENT_INPUT]: (state, { payload: { postId, value } }) => {
    return state.setIn(['reComment', postId, 'value'], value);
  },
  ...pender({
    type: SUBMIT_COMMENT,
    onPending: (state, action) => {
      return state.set('comment', '');
    },
    onSuccess: (state, action) => {
      const { data }  = action.payload;
      return state.update('comments', comments => comments.concat(fromJS(data)));
    }
  }),
  ...pender({
    type: GET_COMMENT,
    onSuccess: (state, action) => {
      const { data } = action.payload;
      return state.set('comments', fromJS(data));
    }
  }),
  ...pender({
    type: SUBMIT_RECOMMENT,
    onPending: (state, action) => {
      const { meta } = action;
      return state.setIn(['reComment', meta, 'value'], '');
    },
    onSuccess: (state, action) => {
      const { data } = action.payload;
      return state.set('comments', fromJS(data));
    }
  })
}, initialState);