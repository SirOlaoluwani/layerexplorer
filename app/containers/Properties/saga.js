import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { LAYER_EXP_API_URL_BASE } from 'containers/App/constants';
import { LOAD_PROPERTIES } from './constants';
import { propertiesLoaded } from './actions';

export function* getProperties({ payload }) {
  const requestUrl = type => {
    const baseUrl = `${LAYER_EXP_API_URL_BASE}/properties`;
    if (type === 'native') return `${baseUrl}/listNatives`;
    if (type === 'oracle') return `${baseUrl}/listOracles`;
    return `${baseUrl}/listProperties`;
  };
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const properties = yield call(request, requestUrl(payload), options);
  yield put(propertiesLoaded(properties.properties));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([takeLatest(LOAD_PROPERTIES, getProperties)]);
}
