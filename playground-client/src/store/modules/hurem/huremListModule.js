import { handleActions, createAction } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from  'redux-pender';

import * as huremPostAPI from 'lib/api/hurem/huremAPI';

const RECEIVE_NEW_POST = 'huremList/RECEIVE_NEW_POST';

// sync
const SHOW_PREFETCHED_POST = 'huremList/SHOW_PREFETCHED_POST';
const CHECK_LIKE = 'huremList/CHECK_LIKE';
const TOGGELE_COMMENT = 'huremComment/TOGGLE_COMMENT';
const CHANGE_COMMENT_INPUT = 'huremComment/CHANGE_COMMENT_INPUT';
const COMMENT = 'huremComment/COMMENT';

// non-sync
const LOAD_POST = 'huremList/LOAD_POST';
const PREFETCH_POST = 'huremList/PREFETCH_POST';
const LIKE_POST = 'hueremList/LIKE_POST';
const UNLIKE_POST = 'huremList/UNLIKE_POST';

// sync
export const showPrefetchedPost = createAction(SHOW_PREFETCHED_POST);
export const checkLike = createAction(CHECK_LIKE);
export const toggleComment = createAction(TOGGELE_COMMENT, postId => postId);
export const changeCommentInput = createAction(CHANGE_COMMENT_INPUT, ({ postId, value }) => ({ postId, value }));

// Non-sync
export const loadPost = createAction(LOAD_POST, huremPostAPI.list);
export const prefetchPost = createAction(PREFETCH_POST, huremPostAPI.next); // URL

// postId를 meta값으로 설정이 (meta값 : ctx.body로 반환된 값이 아닌 API를 호출할때 가는 파라미터를 여기서 반환함)
export const likePost = createAction(LIKE_POST, huremPostAPI.like, (payload) => payload);
export const unlikePost = createAction(UNLIKE_POST, huremPostAPI.unlike, (payload) => payload); // postId를 meta값으로 설정
export const comment = createAction(COMMENT, huremPostAPI.comment, ({ postId }) => postId);

const initialState = Map({
  next: '',
  data: List(), // 현재 보여지는 data
  nextData: List(), // 다음 대기 중인 data
  comments: Map({
    _postId: Map({
      visible: false,
      value: ''
    })
  })
});

export default handleActions({
  [TOGGELE_COMMENT]: (state, { payload: postId }) => {
    const comment = state.getIn(['comments', postId]);
    if(comment) {
      return state.updateIn(['comments', postId], comment => comment.set('visible', !comment.get('visible')));
    }

    // comment가 존재하지 않을때,
    return state.setIn(['comments', postId], Map({
      visible: true,
      value: ''
    }));
  },
  [CHANGE_COMMENT_INPUT]: (state, { payload: { postId, value } }) => {
    return state.setIn(['comments', postId, 'value'], value);
  },

  [CHECK_LIKE]: (state, action) => {
    const { postId, value } = action.payload;
    const index = state.get('data').findIndex(post => post.get('_id') === postId);
    return state.setIn(['data', index, 'like'], value);
  },
  [SHOW_PREFETCHED_POST]: (state, action) => {
    const nextData = state.get('nextData');
    return state.update('data', data => data.concat(nextData)).set('nextData', List());
  },
  [RECEIVE_NEW_POST]: (state, action) => {
    const { payload } = action;
    return state.update('data', data => data.unshift(fromJS(payload)));
  },
  ...pender({
    type: LOAD_POST,
    onSuccess: (state, action) => {
      const { next, data } = action.payload.data;
      // 비동기로 가져온 값을 Map에 넣을때는 fromJS를 해줘야한다. 그냥 가져온 값이면 그냥 Map
      return state.set('next', next).set('data', fromJS(data));
    }
  }),
  ...pender({
    type: PREFETCH_POST,
    onSuccess: (state, action) => {
      const { next, data } = action.payload.data;
      return state.set('next', next).set('nextData', fromJS(data));
    }
  }),
  ...pender({
    type: LIKE_POST,
    onPending: (state, action) => { // 미리 값을 바꿔줌으로서 user의 experience에 도움을 준다.
      // 데이터에 담긴 값들을 post로 가져와서 action.meta값과 비교한다.
      const index = state.get('data').findIndex(post => post.get('_id') === action.meta);
      return state.updateIn(['data', index], (post) => post.update('likesCount', count => count + 1));
    },
    onSuccess: (state, action) => {
      const { likesCount, username } = action.payload.data;
      const index = state.get('data').findIndex(post => post.get('_id') === action.meta);
      return state.setIn(['data', index, 'likesCount'], likesCount).updateIn(['data', index, 'likes'], (post) => post.push(fromJS(username)));
    }
  }),
  ...pender({
    type: UNLIKE_POST,
    onPending: (state, action) => {
      const index = state.get('data').findIndex(post => (post.get('_id') === action.meta));
      return state.updateIn(['data', index], (post) => post.update('likesCount', count => count - 1));
    },
    onSuccess: (state, action) => {
      const { likesCount, username } = action.payload.data;
      const index = state.get('data').findIndex(post => post.get('_id') === action.meta);
      const userIndex = state.get('data').findIndex(post => post.get('likes') === username);
      return state.setIn(['data', index, 'likesCount'], likesCount).updateIn(['data', index, 'likes'], (likes) => likes.delete(userIndex));
    }
  }),
  ...pender({
    type: COMMENT,
    onPending: (state, action) => {
      return state.setIn(['comments', action.meta, 'value'], '');
    },
    onSuccess: (state, action) => {
      console.log(action.payload.data);
      const index = state.get('data').findIndex((post) => post.get('_id') === action.meta);
      return state.setIn(['data', index, 'comment'], fromJS(action.payload.data));
    }
  })
}, initialState);