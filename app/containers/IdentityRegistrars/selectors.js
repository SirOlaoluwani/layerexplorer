import { createSelector } from 'reselect';

/**
 * Direct selector to the search state domain
 */
const selectIdRegistrarsDomain = state => state.get('idRegistrars');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Search
 */

const makeSelectIdRegistrars = () =>
  createSelector(selectIdRegistrarsDomain, substate => substate.toJS());

export default makeSelectIdRegistrars;
export { selectIdRegistrarsDomain };
