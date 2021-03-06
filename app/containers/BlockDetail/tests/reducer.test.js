import { fromJS } from 'immutable';
import blockDetailReducer from '../reducer';

const initialBlock = {
  transactions: [],
};

const initialState = fromJS({
  loading: true,
  block: initialBlock,
});

describe('blockDetailReducer', () => {
  it('returns the initial state', () => {
    expect(blockDetailReducer(undefined, {})).toEqual(fromJS(initialState));
  });
});
