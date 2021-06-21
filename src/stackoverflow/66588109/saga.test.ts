import { AbortController } from 'abortcontroller-polyfill/dist/cjs-ponyfill';
import { call, cancelled } from 'redux-saga/effects';
import { doSomething, getFoo } from './saga';

describe('66588109', () => {
  it('should pass', async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');
    const gen = doSomething();
    expect(gen.next().value).toEqual(call(getFoo, expect.any(AbortController)));
    expect(gen.return!().value).toEqual(cancelled());
    gen.next(true);
    expect(abortSpy).toBeCalledTimes(1);
    abortSpy.mockRestore();
  });
});
