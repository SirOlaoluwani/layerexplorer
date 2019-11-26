/*
 *
 * Search reducer
 *
 */

import { fromJS } from 'immutable';
import { LOAD_PROPERTIES, LOAD_PROPERTIES_SUCCESS } from './constants';

const initialState = fromJS({
  loading: true,
  properties: [],
});

function propertiesReducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case LOAD_PROPERTIES:
      return state.set('loading', true);
    case LOAD_PROPERTIES_SUCCESS:
      return state.set('loading', false).set('properties', payload);
    default:
      return state;
  }
}

export default propertiesReducer;
