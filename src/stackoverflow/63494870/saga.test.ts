import { testSaga } from 'redux-saga-test-plan';
import { handleCall } from './saga';
import * as act from './actionCreators';

describe('63494870', () => {
  it('should pass', () => {
    testSaga(handleCall).next().delay(1000).next().put(act.call()).next().isDone();
  });
});
