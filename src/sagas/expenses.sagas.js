import { call, delay, fork, put, takeEvery } from 'redux-saga/effects'
import {
  catchError,
  saveExpenses,
  loadExpenses,
  setLoading,
  addExpense,
  addExpenseAction,
} from '../slices/expenses.slice'
import apis from '../apis'

export function* onLoadExpensesStartAsync() {
  try {
    yield put(setLoading(true))
    const expenses = yield call(apis.fetchExpenses)
    yield delay(1000)
    yield put(saveExpenses(expenses))
    yield put(setLoading(false))
  } catch (err) {
    yield put(catchError(err))
  }
}

export function* onAddExpenseStartAsync({ payload }) {
  try {
    const { success } = yield call(apis.addExpense, payload)
    if (success) {
      yield put(addExpense(payload))
    }
  } catch (err) {
    yield put(catchError(err?.toString()))
  }
}

export function* onLoadExpenses() {
  yield takeEvery(loadExpenses, onLoadExpensesStartAsync)
}

export function* addExpenseSaga() {
  yield takeEvery(addExpenseAction, onAddExpenseStartAsync)
}

const expensesSaga = [fork(onLoadExpenses), fork(addExpenseSaga)]

export default expensesSaga
