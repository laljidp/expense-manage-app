import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Spinner, ListGroup, ListGroupItem } from 'reactstrap'
import { generateUUID } from '../apis/apiUtils'
import { addExpenseAction, loadExpenses } from '../slices/expenses.slice'
import AddExpenseModal from './AddExpenseModal'

const ExpensesLists = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { data, loading } = useSelector((state) => state.expenses)
  useEffect(() => {
    dispatch(loadExpenses())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSaveExpense = (payload) => {
    // Dispatch action to save expense
    const reformedPayload = {
      ...payload,
      id: generateUUID(),
      createdAt: Date().toString(),
    }
    dispatch(addExpenseAction(reformedPayload))
    toggleAddExpenseModal()
  }

  const toggleAddExpenseModal = () => setOpen(!open)

  if (loading)
    return (
      <Spinner
        color="primary"
        className="mt-5"
        style={{
          height: '3rem',
          width: '3rem',
        }}
      >
        Loading...
      </Spinner>
    )

  return (
    <div className="expenses-lists-section">
      {data.length === 0 && !loading && (
        <div>
          <span className="text-success">No expenses record found!</span>
        </div>
      )}
      <div className="mt-3">
        <Button onClick={toggleAddExpenseModal} size="sm" color="success">
          Add Contributor
        </Button>
      </div>
      <ListGroup className="mt-4 p-3">
        {data.map((expense) => (
          <ListGroupItem color="info" className="expense mt-2">
            <div className="d-flex justify-content-between">
              <span className="d-grid text-start">
                {expense.title}
                <small className="text-left text-success">
                  {expense.contributorName || 'Ajay p'}
                </small>
              </span>
              <span className="fw-bold align-self-center">
                {expense.amount} ₹{' '}
              </span>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <AddExpenseModal
        className=""
        onClose={toggleAddExpenseModal}
        open={open}
        handleSave={handleSaveExpense}
      />
    </div>
  )
}

export default ExpensesLists
