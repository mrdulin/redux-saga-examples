import { testSaga } from 'redux-saga-test-plan';
import { TakeEffect } from 'redux-saga/effects';
import { mySaga } from './saga';

describe('63523200', () => {
  it('should pass', () => {
    testSaga(mySaga, { type: 'myActionType' })
      .next()
      .inspect<TakeEffect>((yieldedValue) => {
        expect(yieldedValue.payload.pattern).toEqual(expect.any(Function));
        // test this anonymous function
        expect((yieldedValue.payload.pattern as Function)({ type: 'myActionType' })).toBeTruthy();
        expect((yieldedValue.payload.pattern as Function)({ type: 'hisActionType' })).toBeFalsy();
      })
      .next({ type: 'otherActionType' })
      .isDone();
  });
});
