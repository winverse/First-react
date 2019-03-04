import { handleActions, createAction } from 'redux-actions';
import { Map } from 'immutable';
import { create } from 'domain';

// Sync action type
const INITIALIZE = 'voucherModule/INITIALIZE';
const INPUT_AMOUNT_CHANGE = 'voucherModule/INPUT_AMOUNT_CHANGE';
const METHOD_SET = 'voucherModule/METHOD_SET';

// Non-Sync action type

// sync actionCreator
export const initialize = createAction(INITIALIZE);
export const inputAmountChange = createAction(INPUT_AMOUNT_CHANGE, value => value);
export const methodSet = createAction(METHOD_SET, method => method);

// Non-sync actionCreator

const initialState = Map({
  method: 'card',
  amount: '',
});

export default handleActions({
  [INITIALIZE]: (state, action) => initialState,
  [INPUT_AMOUNT_CHANGE]: (state, { payload: value }) => {
    const parserValue = value.replace(/[^\d]+/g, '');
    return state.set('amount', parserValue);
  },
  [METHOD_SET]: (state, { payload: method }) => {
    return state.set('method', method);
  }
}, initialState);