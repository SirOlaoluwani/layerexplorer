import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_PROPERTIES } from './constants';
import { propertiesLoaded } from './actions';

export function* getProperties() {
  const requestURL = `${API_URL_BASE}/properties`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const properties = yield call(request, requestURL, options);
  console.log(properties);

  yield put(propertiesLoaded(properties));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([takeLatest(LOAD_PROPERTIES, getProperties)]);
}
