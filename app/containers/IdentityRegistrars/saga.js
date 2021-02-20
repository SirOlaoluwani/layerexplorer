import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_ID_REGISTRARS } from './constants';
import { idRegistrarsLoaded } from './actions';

export function* getIdRegistrars() {
  const requestURL = `${API_URL_BASE}/identity-registrars`;

  const options = {
    method: 'GET',
  };

  const idRegistrars = yield call(request, requestURL, options);
  console.log(idRegistrars);

  yield put(idRegistrarsLoaded(idRegistrars));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([takeLatest(LOAD_ID_REGISTRARS, getIdRegistrars)]);
}
