import { channel } from 'redux-saga';
import { take, fork, call, put } from 'redux-saga/effects';
import { createStoreWithSaga } from '../../utils';

function* watchRequests() {
  // create a channel to queue incoming requests
  const chan = yield call(channel);

  // create 3 worker 'threads'
  for (var i = 0; i < 3; i++) {
    console.log(`${new Date().toISOString()} fork handleRequest: `, i);
    yield fork(handleRequest, chan);
  }

  while (true) {
    console.log(`${new Date().toISOString()} start take action...`);
    const { payload } = yield take('REQUEST');
    console.log(`${new Date().toISOString()} take action: `, payload);
    yield put(chan, payload);
    console.log(`${new Date().toISOString()} put payload: ${payload} for action`);
  }
}

const responseTime = {
  0: 5000,
  1: 1000,
  2: 1000,
  3: 2000,
};
function apiCall(params) {
  const rt = responseTime[params];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params);
    }, rt);
  });
}

function* handleRequest(chan) {
  while (true) {
    const payload = yield take(chan);
    const res = yield call(apiCall, payload);
    console.log(`${new Date().toISOString()} api call response: `, res);
  }
}

const store = createStoreWithSaga(watchRequests);
for (let i = 0; i < 4; i++) {
  store.dispatch({ type: 'REQUEST', payload: i });
}
