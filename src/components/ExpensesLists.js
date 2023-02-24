import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadExpenses } from '../slices/expenses.slice'

const ExpensesLists = () => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.expenses)
  useEffect(() => {
    dispatch(loadExpenses())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return 'Loading....'

  if (data.length === 0) {
    return (
      <div>
        <h3>No expenses record found!</h3>
      </div>
    )
  }

  return (
    <div className="expenses-lists-section">
      <h3>Expenses</h3>
      {data.map((expense) => (
        <div className="expense">
          <span>{expense.expenseTitle}</span>
          <span>{expense.amount} </span>
        </div>
      ))}
    </div>
  )
}

export default ExpensesLists
