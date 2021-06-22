import { put } from 'redux-saga/effects';

export function stopPolling() {
  return { type: 'STOP_POLLING' };
}
export function displayError(error) {
  return { type: 'DISPLAY_ERROR', payload: error };
}

export function* sagaWithPolling() {
  while (true) {
    try {
      // saga body
      yield 1;
    } catch (error) {
      yield put(stopPolling());
      yield put(displayError(error));
    }
  }
}
