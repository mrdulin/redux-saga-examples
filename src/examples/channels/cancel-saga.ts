import { call, cancelled, take, takeLatest } from '@redux-saga/core/effects';
import { eventChannel, END } from 'redux-saga';
import { createStoreWithSaga } from '../../utils';

function countdown(secs) {
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      secs -= 1;
      if (secs > 0) {
        emitter(secs);
      } else {
        // this causes the channel to close
        emitter(END);
      }
    }, 1000);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(iv);
    };
  });
}

function* saga() {
  const chan = yield call(countdown, 5);
  try {
    while (true) {
      let seconds = yield take(chan);
      console.log('countdown: ', seconds);
    }
  } finally {
    if (yield cancelled()) {
      chan.close();
      console.log('countdown cancelled');
    }
  }
}

function* watchSaga() {
  yield takeLatest('COUNTDOWN', saga);
}

const store = createStoreWithSaga(watchSaga);

store.dispatch({ type: 'COUNTDOWN' });
