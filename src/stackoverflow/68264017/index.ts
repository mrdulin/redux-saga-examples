import { call, put, takeLatest } from 'redux-saga/effects';
import { createStoreWithSaga } from '../../utils';
const actionType = {
  LOGIN: 'LOGIN',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
};
function apiCall() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ error: null, data: 'login success' });
    }, 2000);
  });
}

function* login(action) {
  console.log('action: ', action);
  const {
    meta: { resolve, reject },
  } = action;
  const response = yield call(apiCall);
  console.log('response: ', response);
  if (response.error) {
    yield put({ type: actionType.LOGIN_FAIL });
    yield call(reject, response.error);
  } else {
    yield put({ type: actionType.LOGIN_SUCCESS, data: response.data });
    yield call(resolve, response.data);
  }
}

function* watchLogin() {
  yield takeLatest(actionType.LOGIN, login);
}

const store = createStoreWithSaga(watchLogin);

function loginCreator(payload, meta) {
  return {
    type: actionType.LOGIN,
    payload,
    meta,
  };
}

const loginAsyncCreator = (dispatch) => (payload) => {
  return new Promise((resolve, reject) => dispatch(loginCreator(payload, { resolve, reject })));
};

const loginAsync = loginAsyncCreator(store.dispatch);

async function startLogin() {
  await loginAsync({ code: '1' });
  console.log('setPublicKey');
}

startLogin();
