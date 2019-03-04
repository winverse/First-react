import { handleActions, createAction } from 'redux-actions';
import { Map } from 'immutable';

const SET_NAV_VISIBILITY = 'base/SET_NAV_VISIBILITY';
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';
const SHOW_VOUCHER_MODAL = 'base/SHOW_VOUCHER_MODAL';
const HIDE_VOUCHER_MODAL = 'base/HIDE_VOUCHER_MODAL';

export const setNavVisibility = createAction(SET_NAV_VISIBILITY, visible => visible);
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const showVoucherModal = createAction(SHOW_VOUCHER_MODAL, modalName => modalName);
export const hideVoucherModal = createAction(HIDE_VOUCHER_MODAL, modalName => modalName);

const initialState = Map({
  nav: Map({
    visible: null
  }),
  modal: Map({
    remove: false,
    voucher: false
  })
});

export default handleActions({
  [SET_NAV_VISIBILITY]: (state, { payload: visible }) => {
    return state.setIn(['nav', 'visible'], visible);
  },
  [SHOW_MODAL]: (state, action) => {
    const { payload: modalName } = action;
    return state.setIn(['modal', modalName], true);
  },
  [HIDE_MODAL]: (state, action) => {
    const { payload: modalName } = action;
    return state.setIn(['modal', modalName], false);  
  },
  [SHOW_VOUCHER_MODAL]: (state, { payload: modalName }) => {
    return state.setIn(['modal', modalName], true);
  },
  [HIDE_VOUCHER_MODAL]: (state, { payload: modalName }) => {
    return state.setIn(['modal', modalName], false);
  }
}, initialState);