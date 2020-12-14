import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_BLOCKS } from 'containers/Blocks/constants';
import { API_URL_BASE } from 'containers/App/constants';
import request from 'utils/request';
import { blocksLoaded } from './actions';
import { makeSelectBlocks } from './selectors';

export function* getBlocks({ block }) {
  const state = yield select(makeSelectBlocks());
  const currentBlock =
    block || (state.appendBlocks ? state.previousBlock || '' : '');

  const requestURL = `${API_URL_BASE}/blocklist/${currentBlock}`;

  const blocks = yield call(request, requestURL);
  yield put(blocksLoaded(blocks));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([takeLatest(LOAD_BLOCKS, getBlocks)]);
}
