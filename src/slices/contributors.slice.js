import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: false,
  error: null,
}

const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    loadContributors: () => {},
    addContributorAction: () => {},
    saveContributors: (state, { payload }) => {
      state.data = payload
    },
    addContributor: (state, { payload }) => {
      console.log('calling it...')
      state.data.push(payload)
    },
    updateContributor: (state, { userID, user }) => {
      const index = state.data.findIndex((u) => u.id === userID)
      state.data.slice(index, 1, user)
    },
    deleteContributor: (state, { userID }) => {
      state.data = state.data.filter((contributor) => contributor.id !== userID)
    },
    deleteAllContributors: (state, { payload }) => {
      state.data = []
      state.loading = false
    },
    handleContributorError: (state, { payload }) => {
      state.error = payload
    },
  },
})

export const {
  addContributor,
  deleteAllContributors,
  deleteContributor,
  loadContributors,
  saveContributors,
  updateContributor,
  handleContributorError,
  addContributorAction,
} = UsersSlice.actions

export default UsersSlice.reducer
