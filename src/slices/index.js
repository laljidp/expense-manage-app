import { combineReducers } from 'redux'
import expenseReducer from './expenses.slice'
import userReducer from './contributors.slice'

const rootReducer = combineReducers({
  expenses: expenseReducer,
  contributors: userReducer,
})

export default rootReducer
