import { testSaga } from 'redux-saga-test-plan';
import { foo } from './saga';
import * as actions from './actions';
import { PutEffect } from 'redux-saga/effects';
import { AnyAction } from 'redux';

describe('54885611', () => {
  it('should pass', () => {
    const logSpy = jest.spyOn(console, 'log');
    testSaga(foo)
      .next()
      .put(actions.start())
      .next()
      .inspect<PutEffect<AnyAction>>((yieldedValue) => {
        expect(yieldedValue.payload.action).toEqual({
          type: 'START',
          payload: expect.objectContaining({ onSuccess: expect.any(Function), onFailed: expect.any(Function) }),
        });
        // test onSuccess
        yieldedValue.payload.action.payload.onSuccess();
        expect(logSpy).toBeCalledWith('do something');

        // test onFailed
        yieldedValue.payload.action.payload.onFailed();
        expect(logSpy).toBeCalledWith('do something else');

        logSpy.mockRestore();
      })
      .next()
      .put(actions.done())
      .next()
      .isDone();
  });
});
