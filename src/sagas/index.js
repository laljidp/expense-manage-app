import { all } from 'redux-saga/effects'
import expensesSaga from './expenses.sagas'
import contributorSagas from './contributor.saga'

export function* rootSagas() {
  yield all([...expensesSaga, ...contributorSagas])
}
