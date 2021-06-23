import { TakeEffect, take } from 'redux-saga/effects';

export function* mySaga(myAction: { type: string }): Generator<TakeEffect, boolean, { type: string }> {
  const { type: actionType } = (yield take((action: any) => action.type === myAction.type)) as { type: string };
  console.log('actionType: ', actionType);
  return actionType === myAction.type;
}
