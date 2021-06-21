import { call, delay, put, race, takeLatest } from '@redux-saga/core/effects';
import { createStoreWithSaga } from '../../utils';

function play(params) {
  console.log('params: ', params);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(100);
    }, params);
  });
}

function* game(params) {
  let finished;
  while (!finished) {
    const { score, timeout } = yield race({
      score: call(play, params.payload),
      timeout: delay(1001),
    });
    console.log('timeout: ', timeout);

    if (!timeout) {
      finished = true;
      yield put({ type: 'WIN_GAME', payload: score });
    } else {
      yield put({ type: 'LOSE_GAME', payload: 0 });
      return;
    }
  }
}

function* watchGame() {
  yield takeLatest('GAME_START', game);
}

function reducer(state = { score: 0 }, action) {
  console.log(action);
  switch (action.type) {
    case 'WIN_GAME':
    case 'LOSE_GAME':
      return { ...state, score: action.payload };
    default:
      return state;
  }
}

const store = createStoreWithSaga(watchGame, reducer);
store.dispatch({ type: 'GAME_START', payload: 1002 });
store.subscribe(() => {
  console.log(store.getState());
});
