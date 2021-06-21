import { call, put, select, takeLatest } from 'redux-saga/effects';
import { dextaApiService } from './dextaApiService';

export const MessageBarType = {
  success: 'success',
  error: 'error',
};

export function openNotification({ messageType, message }) {
  return { type: messageType, payload: message };
}

export const getToken = (state) => state.dextaAuth.token;

export function* setPost(action) {
  try {
    const token = yield select(getToken);
    const data = yield call(dextaApiService.post, '/api/savedAdvices', action.payload, token);
    yield put(
      openNotification({
        messageType: MessageBarType.success,
        message: 'Advice saved successfully',
      }),
    );
  } catch (err) {
    yield put(
      openNotification({
        messageType: MessageBarType.error,
        message: `Notification: ${err.message}`,
      }),
    );
  }
}

export function* savedAdvicesaga() {
  yield takeLatest('POST_SAVED_ADVICE', setPost);
}
