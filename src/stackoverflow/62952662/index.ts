import { put, select, call, takeEvery } from 'redux-saga/effects';
import { postDATA } from './service';

export const ActionTypes = {
  SAVE_DATA_OK: 'SAVE_DATA_OK',
  CRITICAL_ERROR_OCCURED: 'CRITICAL_ERROR_OCCURED',
  SAVE_DATA_REQ: 'SAVE_DATA_REQ',
};

const showStatusMessage = (payload) => ({ type: 'SHOW_STATUS_MESSAGE', payload });
const hideStatusMessage = () => ({ type: 'HIDE_STATUS_MESSAGE' });

export function* onSaveDATA() {
  try {
    yield put(showStatusMessage({ messageContent: 'Saving Your Data' }));
    const body = yield select((state) => state.appData.userDetails);
    yield call(postDATA, { body });
    yield put(hideStatusMessage());
    yield put({ type: ActionTypes.SAVE_DATA_OK });
  } catch (e) {
    yield put({ type: ActionTypes.CRITICAL_ERROR_OCCURED, payload: e });
  }
}

export function* save_on_change() {
  yield takeEvery(ActionTypes.SAVE_DATA_REQ, onSaveDATA);
}
