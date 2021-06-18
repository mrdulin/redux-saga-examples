import { call, fork, take } from '@redux-saga/core/effects';
import { createStoreWithSaga } from '../../utils';

function* watchRequests() {
  while (true) {
    const { payload } = yield take('REQUEST');
    console.log(`${new Date().toISOString()} payload:`, payload);
    yield fork(handleRequest, payload);
  }
}

function apiCall(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params);
    }, 2000);
  });
}

function* handleRequest(payload) {
  yield call(apiCall, payload);
}

const store = createStoreWithSaga(watchRequests);
for (let i = 0; i < 4; i++) {
  store.dispatch({ type: 'REQUEST', payload: i });
}
