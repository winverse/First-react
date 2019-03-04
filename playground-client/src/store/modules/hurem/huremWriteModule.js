import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map } from 'immutable';

import * as huremAPI from 'lib/api/hurem/huremAPI';

const CHANGE_WRITE_POST_INPUT = 'huremWrite/CHANGE_WRITE_POST_INPUT';

// Non-sync
const WRITE_POST = 'huremWrite/WRITE_POST'; 


export const changeWritePostInput = createAction(CHANGE_WRITE_POST_INPUT, value => value );
// Non-sync
export const writePost = createAction(WRITE_POST, huremAPI.write);

const initialState = Map({
  writePost: Map({
    value: ''
  })
});

export default handleActions({
  [CHANGE_WRITE_POST_INPUT]: (state, { payload: value }) => {
    return state.setIn(['writePost', 'value'], value);
  },
  ...pender({
    type: WRITE_POST,
    onPending: (state, action) => {
      return state.setIn(['writePost', 'value'], '');
    }
  })
}, initialState);