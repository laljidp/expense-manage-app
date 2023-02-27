import { v4 as uuidv4 } from 'uuid'
import { CONTRIBUTORS, EXPENSES } from '.'

export const getExpensesFromStorage = () => {
  return JSON.parse(localStorage.getItem(EXPENSES) || '[]')
}

export const saveExpensesToStorage = (expenses) => {
  localStorage.setItem(EXPENSES, JSON.stringify(expenses))
}

export const getContributorsFromStorage = () => {
  return JSON.parse(localStorage.getItem(CONTRIBUTORS) || '[]')
}

export const saveContributorsToStorage = (contributors) => {
  localStorage.setItem(CONTRIBUTORS, JSON.stringify(contributors))
}

export const awaitAndCall = (fun, timer) => {
  return setTimeout(() => {
    fun()
  }, [timer])
}

export const generateUUID = () => uuidv4()
