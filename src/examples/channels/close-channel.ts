import { call, take, takeLatest } from '@redux-saga/core/effects';
import createSagaMiddleware, { eventChannel, END } from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

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
    console.log('countdown terminated');
  }
}

function* watchSaga() {
  yield takeLatest('COUNTDOWN', saga);
}

const sagaMiddleware = createSagaMiddleware();
function reducer(state, action) {
  return state;
}
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchSaga);

store.dispatch({ type: 'COUNTDOWN' });
