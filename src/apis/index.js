import {
  getContributorsFromStorage,
  getExpensesFromStorage,
  saveContributorsToStorage,
  saveExpensesToStorage,
} from './apiUtils'

export const EXPENSES = 'expenses'
export const CONTRIBUTORS = 'contributors'

/*****  Expenses APIs methods  ***/

const fetchExpenses = () => {
  return new Promise((resolve, reject) => {
    const expenses = getExpensesFromStorage()
    // check if there is any data in localstorage
    if (!expenses) {
      resolve([])
    } else if (Array.isArray(expenses)) {
      resolve(expenses)
    } else {
      reject({
        message: 'Something went wrong!',
      })
    }
  })
}

const addExpense = (expense) => {
  return new Promise((resolve) => {
    const expenses = getExpensesFromStorage()
    expense.push(expense)
    localStorage.setItem(EXPENSES, JSON.stringify(expenses))
    resolve({ message: 'Expense saved!' })
  })
}

const updateExpenses = (id, expense) => {
  return new Promise((resolve, reject) => {
    const expenses = getExpensesFromStorage()
    if (expenses?.length === 0) {
      reject({ message: 'Record not found!' })
    }
    const ind = expenses.findIndex((e) => e.id === id)
    if (ind === -1) {
      reject({ message: 'Record not found!' })
    }
    expenses.slice(ind, 1, expense)
    saveExpensesToStorage(expenses)
    resolve({ message: 'Expense record updated!' })
  })
}

const deleteAllExpenses = () => {
  return new Promise((resolve, reject) => {
    localStorage.setItem(EXPENSES, '[]')
    setTimeout(() => {
      resolve()
    }, 1500)
  })
}

/**** END Expenses APIs methods ****/

/** Contributors APIs methods  */

const fetchContributors = () => {
  return new Promise((resolve, reject) => {
    const contributors = getContributorsFromStorage()
    // check if there is any data in localstorage
    if (!contributors) {
      resolve([])
    } else if (Array.isArray(contributors)) {
      resolve(contributors)
    } else {
      reject({
        message: 'Something went wrong!',
      })
    }
  })
}

const addContributors = (contributor) => {
  return new Promise((resolve) => {
    const contributors = getContributorsFromStorage()
    contributors.push(contributor)
    saveContributorsToStorage(contributors)
    resolve({ message: 'Contributor Added!', success: false })
  })
}

const updateContributors = (id, contributor) => {
  return new Promise((resolve, reject) => {
    const contributors = getContributorsFromStorage()
    if (contributors?.length === 0) {
      reject({ message: 'Contributor not found!', success: false })
    }
    const ind = contributors.findIndex((cont) => cont.id === id)
    if (ind === -1) {
      reject({ message: 'Contributor not found!', success: false })
    }
    contributors.slice(ind, 1, contributor)
    saveExpensesToStorage(contributors)
    resolve({ message: 'Contributor updated!', success: true })
  })
}

const deleteAllContributors = () => {
  return new Promise((resolve, reject) => {
    localStorage.setItem(CONTRIBUTORS, '[]')
    setTimeout(() => {
      resolve()
    }, 1500)
  })
}

/**** END Contributors APIs methods  */

const apis = {
  fetchExpenses,
  addExpense,
  updateExpenses,
  deleteAllExpenses,
  fetchContributors,
  addContributors,
  updateContributors,
  deleteAllContributors,
}

export default apis
