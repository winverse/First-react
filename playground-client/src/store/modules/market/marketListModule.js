import { handleActions, createAction } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';

import * as marketAPI from 'lib/api/market/marketAPI';

// Sync action type

// Non-Sync action type
const GET_LIST = 'marketList/GET_LIST';

// sync actionCreator

// Non-sync actionCreator
export const getList = createAction(GET_LIST, marketAPI.getList);

const initialState = Map({
  next: '',
  data: List(),
  nextData: List(),
});

export default handleActions({
  ...pender({
    type: GET_LIST,
    onSuccess: (state, action) => {
      const { next, data } = action.payload.data; 
      return state.set('next', next).set('data', data);
    } 
  })
}, initialState);