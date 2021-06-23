import { END, eventChannel } from 'redux-saga';
import { call, take, takeLatest } from 'redux-saga/effects';
import { createStoreWithSaga } from '../../utils';

function uploadVideoApi(file, callback) {
  let e = {
    loaded: 0,
    total: file.size,
  };
  const iv = setInterval(() => {
    if (e.loaded < file.size) {
      e.loaded += 20;
      callback(e);
    }
  }, 1000);

  return iv;
}

function upload(file) {
  return eventChannel((emit) => {
    const cancelUploadSignal = uploadVideoApi(file, (e) => {
      const progress = e.loaded / e.total;
      emit(progress);
      if (progress === 1) {
        emit(END);
      }
    });

    return () => {
      clearInterval(cancelUploadSignal);
    };
  });
}

function* uploadSaga(action) {
  const chan = yield call(upload, action.payload.file);
  try {
    while (true) {
      const progress = yield take(chan);
      console.log(`${new Date().toISOString()} progress: `, progress);
    }
  } finally {
    console.log(`${new Date().toISOString()} uploaded finished`);
  }
}

function* watchOnProgress() {
  yield takeLatest('UPLOAD', uploadSaga);
}

const store = createStoreWithSaga(watchOnProgress);

store.dispatch({ type: 'UPLOAD', payload: { file: { size: 100 } } });
