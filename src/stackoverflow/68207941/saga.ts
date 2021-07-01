import { put, takeLatest } from 'redux-saga/effects';
import { createStoreWithSaga } from '../../utils';

const OTP_VERIFIED = 'OTP_VERIFIED';

function* getOTPVerified(action: any) {
  yield put({
    type: 'OTP_VERIFIED_SUCCESS',
    OTPVerified: action.OTPVerified,
  });
}

function* extrasSaga() {
  yield takeLatest(OTP_VERIFIED, getOTPVerified);
}

const store = createStoreWithSaga(extrasSaga);

store.dispatch({ type: OTP_VERIFIED });
