import axios from 'axios';
import { race, call, delay, cancel, cancelled, takeLatest } from 'redux-saga/effects';
import { createStoreWithSaga } from '../../utils';
import { api } from './api';

function* workerSaga() {
  const cancelSource = axios.CancelToken.source();

  try {
    const { posts, timeout } = yield race({
      posts: call(api.callFunction, cancelSource.token),
      timeout: delay(0),
    });

    console.log(posts); // return success

    if (timeout) {
      console.log('TIMEOUT', timeout);
      yield cancel();
    }
  } finally {
    console.log('finally');
    if (yield cancelled()) {
      console.log('cancelled');
      yield call(cancelSource.cancel);
    }
  }
}

function* watchSaga() {
  yield takeLatest('REQUEST', workerSaga);
}

const store = createStoreWithSaga(watchSaga);
store.dispatch({ type: 'REQUEST' });
