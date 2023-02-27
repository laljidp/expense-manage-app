import { call, fork, put, takeEvery } from 'redux-saga/effects'
import {
  addContributor,
  saveContributors,
  handleContributorError,
  loadContributors,
  addContributorAction,
  deleteContributorAction,
  setLoading,
} from '../slices/contributors.slice'
import apis from '../apis'

export function* onLoadContributorsStartAsync() {
  try {
    yield put(setLoading(true))
    const contributors = yield call(apis.fetchContributors)
    yield put(saveContributors(contributors))
    yield put(setLoading(false))
  } catch (err) {
    yield put(handleContributorError(err))
  }
}

export function* onAddContributorStartAsync({ payload }) {
  try {
    console.log('payload=======>', payload)
    const response = yield call(apis.addContributors, payload)
    console.log('response', response)
    if (!response) {
      yield put(handleContributorError({ message: 'Something went wrong' }))
    } else {
      yield put(addContributor(payload))
    }
  } catch (err) {
    console.log('Getting error', err)
  }
}

export function* onDeleteContributeStartAsync({ payload }) {
  try {
    const { data } = yield call(apis.deleteContributor, payload)
    yield put(saveContributors(data))
  } catch (err) {
    yield put(handleContributorError(err))
  }
}

export function* onLoadContributors() {
  yield takeEvery(loadContributors, onLoadContributorsStartAsync)
}

export function* onAddContributor() {
  yield takeEvery(addContributorAction, onAddContributorStartAsync)
}

export function* onDeleteContributor() {
  yield takeEvery(deleteContributorAction, onDeleteContributeStartAsync)
}

const contributorSagas = [
  fork(onLoadContributors),
  fork(onAddContributor),
  fork(onDeleteContributor),
]

export default contributorSagas
