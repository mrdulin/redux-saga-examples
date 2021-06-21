import { call, put, takeLatest } from 'redux-saga/effects';
import { createStoreWithSaga } from '../../utils';

const actionType = { GET_INFO: 'GET_INFO', GET_INFO_FAIL: 'GET_INFO_FAIL', GET_INFO_SUCCESS: 'GET_INFO_SUCCESS' };

export function getInfo(payload, meta) {
  return {
    type: actionType.GET_INFO,
    payload,
    meta,
  };
}

function apiCall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'Info from API', error: null });
      //   resolve({ data: null, error: new Error('business error') });
    }, 1000);
  });
}

function* getInfoSaga(action) {
  console.log(action);
  const {
    meta: { resolve, reject },
  } = action;
  const response = yield call(apiCall);
  if (response.error) {
    yield put({ type: actionType.GET_INFO_FAIL });
    yield call(reject, response.error);
  } else {
    yield put({ type: actionType.GET_INFO_SUCCESS, data: response.data });
    yield call(resolve, response.data);
  }
}

function* watchSaga() {
  yield takeLatest(actionType.GET_INFO, getInfoSaga);
}

const INITIAL_STATE = {
  info: '',
};
const infoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.GET_INFO_SUCCESS:
      return {
        info: action.data,
      };
    default:
      return state;
  }
};

const store = createStoreWithSaga(watchSaga, infoReducer);

export const bindActionToPromise = (dispatch, actionCreator) => (payload) => {
  return new Promise((resolve, reject) => dispatch(actionCreator(payload, { resolve, reject })));
};

const boundGetInfo = bindActionToPromise(store.dispatch, getInfo);
boundGetInfo({ id: 1 })
  .then((res) => {
    console.log('res immediately: ', res);
  })
  .catch((err) => {
    console.log('error immediately: ', err);
  });
store.subscribe(() => {
  console.log('state: ', store.getState());
});
