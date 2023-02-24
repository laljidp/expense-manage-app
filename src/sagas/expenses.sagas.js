import { call, delay, fork, put, takeEvery } from 'redux-saga/effects'
import {
  catchError,
  saveExpenses,
  loadExpenses,
} from '../slices/expenses.slice'
import apis from '../apis'

export function* onLoadExpensesStartAsync() {
  try {
    const expenses = yield call(apis.fetchExpenses)
    yield delay(1000)
    yield put(saveExpenses(expenses))
  } catch (err) {
    yield put(catchError(err))
  }
}

export function* onLoadExpenses() {
  yield takeEvery(loadExpenses, onLoadExpensesStartAsync)
}

const expensesSaga = [fork(onLoadExpenses)]

export default expensesSaga
