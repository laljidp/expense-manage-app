import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  data: [],
  loading: false,
  error: null,
}

const ExpensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    loadExpenses: () => {},
    saveExpenses: (state, { payload }) => {
      state.data = payload
    },
    addExpense: (state, { payload }) => {
      state.data.push({ payload, completed: false })
    },
    deleteExpense: (state, { payload }) => {
      state.data = state.data.filter((exp) => exp.id !== payload)
    },
    updateExpense: (state, { payload }) => {
      const { expID, expense } = payload
      const idx = state.data.findIndex((e) => e.id === expID)
      state.data.slice(idx, 1, expense)
    },
    catchError: (state, { payload }) => {
      state.error = payload
    },
  },
})

export const {
  addExpense,
  deleteExpense,
  updateExpense,
  catchError,
  loadExpenses,
  saveExpenses,
} = ExpensesSlice.actions

export default ExpensesSlice.reducer
