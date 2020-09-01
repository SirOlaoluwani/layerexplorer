import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';

import { LOAD_BLOCKS } from 'containers/Blocks/constants';
import { LAYER_EXP_API_URL_BASE } from 'containers/App/constants';

import request from 'utils/request';
import { blocksLoaded, loadBlocks, disableLoading } from './actions';
import { makeSelectBlocks } from './selectors';
import { dispatch } from '../../configureStore';

function* getBlock(block) {
  const state = yield select(makeSelectBlocks());
  if (state.appendBlocks && !isEmpty(state.previousBlock)) {
    return state.previousBlock;
  }

  if (isEmpty(block)) {
    const listPropertyURL = `${LAYER_EXP_API_URL_BASE}/properties/listProperties`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const properties = yield call(request, listPropertyURL, options);

    return properties.block;
  }

  return block;
}

export function* getBlocks({ block }) {
  const blockHeight = yield call(getBlock, block);

  const requestURL = `${LAYER_EXP_API_URL_BASE}/txn/getblocktx/${blockHeight}`;

  const blocks = yield call(request, requestURL);

  yield put(disableLoading());

  if (!isEmpty(blocks)) {
    yield put(blocksLoaded({ blocks }));
  }
  // window.setInterval(yield put(loadBlocks(block)), 180000);

  yield call(window.setInterval, put(loadBlocks(block)), 1000);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  // yield all([takeLatest(LOAD_BLOCKS, getBlocksWebSocket)]);
  yield all([takeLatest(LOAD_BLOCKS, getBlocks)]);
}
