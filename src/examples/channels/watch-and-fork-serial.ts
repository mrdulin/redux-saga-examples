import { actionChannel, call, take } from '@redux-saga/core/effects';
import { createStoreWithSaga } from '../../utils';

function* watchRequests() {
  const chan = yield actionChannel('REQUEST');
  while (true) {
    const { payload } = yield take(chan);
    // block here until call(handleRquest) returns, then take next action from actionChannel
    yield call(handleRequest, payload);
    console.log(`${new Date().toISOString()} handle a task`);
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
