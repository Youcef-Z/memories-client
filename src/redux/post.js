import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

export const fetchPost = createAsyncThunk('posts/fetchPost', async (id) => {
  const { data } = await api.fetchPost(id)
  return data
})

const initialState = {
  post: null,
  status: 'idle',
  error: null
}

export const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.error = null
        state.post = action.payload
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectPost = (state) => state.post.post
export const selectPostStatus = (state) => state.post.status
export const selectPostError = (state) => state.post.error

export default postsSlice.reducer