import { call, delay, fork, put, takeEvery } from 'redux-saga/effects'
import {
  addContributor,
  saveContributors,
  handleContributorError,
  loadContributors,
  addContributorAction,
} from '../slices/contributors.slice'
import apis from '../apis'

export function* onLoadContributorsStartAsync() {
  try {
    const contributors = yield call(apis.fetchContributors)
    yield delay(1000)
    yield put(saveContributors(contributors))
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

export function* onLoadContributors() {
  yield takeEvery(loadContributors, onLoadContributorsStartAsync)
}

export function* onAddContributor() {
  yield takeEvery(addContributorAction, onAddContributorStartAsync)
}

const contributorSagas = [fork(onLoadContributors), fork(onAddContributor)]

export default contributorSagas
