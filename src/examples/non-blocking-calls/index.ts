import { take, put, call, fork, cancel, cancelled } from 'redux-saga/effects';
import { createStoreWithSaga } from '../../utils';
import Api from './api';

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password);
    yield put({ type: 'LOGIN_SUCCESS', token });
    return token;
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error });
  } finally {
    if (yield cancelled()) {
      console.log('authorize cancelled');
    }
  }
}

function* loginFlow() {
  while (true) {
    console.log('1');
    const { user, password } = yield take('LOGIN_REQUEST');
    const task = yield fork(authorize, user, password);
    console.log('2');
    const action = yield take(['LOGOUT', 'LOGIN_ERROR']);
    console.log('3');
    if (action.type === 'LOGOUT') yield cancel(task);
    yield call(Api.clearItem, 'token');
  }
}

const store = createStoreWithSaga(loginFlow);

store.dispatch({ type: 'LOGIN_REQUEST' });
// 用户多次重复调用LOGIN_REQUEST并不会执行yield take('LOGIN_REQUEST')，因为第一次调用LOGIN_REQUEST以后，代码已经执行到了yield take(['LOGOUT', 'LOGIN_ERROR'])，由于take effect是阻塞的，所以代码会暂停在这里直到接收到LOGOUT或LOGIN_ERROR action
// store.dispatch({ type: 'LOGIN_REQUEST' });
// store.dispatch({ type: 'LOGIN_REQUEST' });
store.dispatch({ type: 'LOGOUT' });
