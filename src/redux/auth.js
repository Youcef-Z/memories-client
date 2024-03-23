import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

const initialState = {
  user: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).result : null,
  error: null,
  loading: false
}

export const login = createAsyncThunk('auth/login', async (authData) => {
  
    const { data } = await api.login(authData)
    return data

})

export const signup = createAsyncThunk('auth/signup', async (authData) => {
  try {
    const { data } = await api.signup(authData)
    return data
  } catch (error) {
    console.log(error.response.data)
  }
})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('profile')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.user = null
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.result
        localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.error = 'Invalid Credentials'
      })
      .addCase(signup.pending, (state) => {
        state.loading = true
        state.user = null
        state.error = null
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.result
        localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
        state.error = null
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.error = action.error.message
      })
  }
})

export const { setUser, logout } = authSlice.actions

export const selectUser = (state) => state.auth.user
export const selectError = (state) => state.auth.error
export const selectLoading = (state) => state.auth.loading

export default authSlice.reducer