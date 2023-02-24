import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { rootSagas } from './sagas'
import rootReducer from './slices'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    sagaMiddleware,
    logger,
    ...getDefaultMiddleware({ thunk: false }),
  ],
  devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(rootSagas)
export default store
