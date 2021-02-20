/*
 *
 * Search reducer
 *
 */

import { fromJS } from 'immutable';
import { LOAD_ID_REGISTRARS, LOAD_ID_REGISTRARS_SUCCESS } from './constants';

const initialState = fromJS({
  loading: true,
  idRegistrars: [],
});

function idRegistrarsReducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case LOAD_ID_REGISTRARS:
      return state.set('loading', true);
    case LOAD_ID_REGISTRARS_SUCCESS:
      return state.set('loading', false).set('idRegistrars', payload);
    default:
      return state;
  }
}

export default idRegistrarsReducer;
