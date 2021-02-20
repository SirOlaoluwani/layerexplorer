import { createSelector } from 'reselect';

/**
 * Direct selector to the search state domain
 */
const selectPropertyDomain = state => state.get('properties');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Search
 */

const makeSelectProperty = () =>
  createSelector(selectPropertyDomain, substate => substate.toJS());

export default makeSelectProperty;
export { selectPropertyDomain };
